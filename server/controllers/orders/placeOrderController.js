import mongoose from "mongoose";
import Orders from "../../models/order.js";
import Ingredients from "../../models/ingredient.js";
import pizzaVarieties from "../../models/pizzaVariety.js";

export default async function placeOrderController(req, res, next){
    const { body: {products} } = req;
    const productIds = products.map(({productId= "N/A"}) => productId);

    const ingredientsOrdered = await Ingredients.find({ 
        _id: { $in: productIds },
        isAvailable: true
    });
    const pizzaVarietiesOrdered = await pizzaVarieties.find({ 
        _id: { $in: productIds },
        isAvailable: true
    });
    const productsOrdered = ingredientsOrdered.concat(pizzaVarietiesOrdered);

    if(productsOrdered.length !== productIds.length) 
        return next({err: "Products which do not exist/are unavailable have been found in the order.", code: 400});
    
    const session = await mongoose.startSession();
    session.startTransaction();

    // place order
    const [ order ] = await Orders.create([req.body], {session});

    // create bulk update stock queries
    const writes = products.map(({ productId, qty }) => {
        productId = productId instanceof mongoose.Types.ObjectId ? productId :
        new mongoose.Types.ObjectId(`${productId}`);

        return {
            updateOne: {
                filter: { _id: productId },
                update: { $inc: { "stock.amount": -qty } }
            }
        }
    });

    await Ingredients.bulkWrite(writes, {session});
    await pizzaVarieties.bulkWrite(writes, {session});

    await session.commitTransaction();
    await session.endSession();

    res.json({
        orderPlaced: true,
        _id: order._id,
        placedAt: order.placedAt
    });
}