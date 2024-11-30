import Orders from "../../models/order.js";

export default async function getOrderByIdController(req, res){
    const { orderId } = req.params;

    const order = await Orders.findById(orderId);
    res.json(order);
}