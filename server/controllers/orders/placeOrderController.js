import mongoose from "mongoose";
import Orders from "../../models/order.js";
import Ingredients from "../../models/ingredient.js";
import Users from "../../models/user.js";
import pizzaVarieties from "../../models/pizzaVariety.js";
import sendMail from "../../utils/sendMail.js";

export default async function placeOrderController(req, res, next){
    try{
        const { body } = req;
        const { products } = body;
        const productIds = products.map(({productId= "N/A"}) => productId);
        const lowStockItems = [];

        // check if user placing order is valid
        const user = await Users.findById(body.userId);
        if (!user) return next({err: "User does not exist.", code: 400});

        // check if invalid/unavailable products are part of order
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
        
        // do not place order if stock requirements not met
        ingredientsOrdered.forEach(ingredient => {
            const product = products.find((product) => String(product.productId) === String(ingredient._id));
            // set actual stock for each product ordered to use later
            product["stock"] = ingredient?.stock?.amount - product.qty;
            
            // add ingredient to low stock list
            if (product.stock <= ingredient.stock?.threshold) lowStockItems.push({ingredient, newStock: product.stock});
            if (product.stock < 0){
                const err = {};
                err[ingredient.name] = "Insufficient stock.";
                return next({err, code: 422});
            }
        });

        const session = await mongoose.startSession();
        session.startTransaction();

        // place order
        const [ order ] = await Orders.create([req.body], {session});

        // store order ref in user doc
        user.orders.push(order._id);
        await user.save();

        // create bulk update stock queries
        const writes = products.map(({ productId, qty, stock }) => {
            return {
                updateOne: {
                    filter: { _id: productId },
                    update: { 
                        $inc: { "stock.amount": -qty },
                        $set: { isAvailable: Boolean(stock) }
                    }   
                }
            }
        });

        await Ingredients.bulkWrite(writes, {session});

        await session.commitTransaction();
        await session.endSession();

        // send email alerts to admin on low stock items
        const lowStockCount = lowStockItems.length;
        if (lowStockCount){
            const mail = { 
                subject: `Alert: ${lowStockCount} INGREDIENTS ON LOW STOCK`,
                to: process.env.ADMIN_USER + "@inbox.mailtrap.io" 
            };
            // create body for mail
            mail.content = "<h1>These ingredients require restocking ASAP: </h1>" + "<ul>"
            lowStockItems.forEach(({ingredient, newStock}) => {
                return (
                    mail.content += `<li>${ingredient.name} - Stock: ${ingredient.stock?.amount - newStock}</li>`
                );
            });
            mail.content += "</ul><p>Restock now at the dashboard: <a href= link</a></p>";
            await sendMail(mail);
        }

        const orderPlaced = {
            orderPlaced: true,
            _id: order._id,
            placedAt: order.placedAt
        };

        res.json(orderPlaced);
        console.log(orderPlaced);
    }
    catch(err){
        next(err);
    }
}

