import mongoose from "mongoose";
import Ingredients from "../../models/ingredient.js";
import pizzaVarieties from "../../models/pizzaVariety.js";

export default async function increaseIngredientStockController(req, res, next){
    const { user } = req;
    if (user.role !== "admin") return next({err: "Not authorized to update products. Contact admin.", code: 401});
   
    const ingredients = req.body;
    const ids = ingredients.map(({id}) => id);
    const session = await mongoose.startSession();

    try{
        // create bulk stock updates
        const writes = ingredients.map(({id, qty}) => {
            if (qty < 1) return next({err: "Stock increase qty should be at least 1.", code: 400});
            return { updateOne: {
                filter: {_id: id},
                update: { $inc: {"stock.amount": qty}, isAvailable: true }
            } }
        });
    
        session.startTransaction();
    
        // update pizza variety availability
        await pizzaVarieties.updateMany({
            ingredients: { 
                $in: ids
            }
        }, { isAvailable: true }, {session});
    
        const result = await Ingredients.bulkWrite(writes, {session});
        await session.commitTransaction();
        res.json({success: true, message: "Stock updated!"});
        console.log(result);
    }
    catch(err){
        next(err);
        session.abortTransaction();
    }

}

