import Orders from "../../models/order.js";
export default async function getOrdersController(req, res){
    const orders = await Orders.find(req.query);
    res.json(orders);
   // console.log(orders);
};