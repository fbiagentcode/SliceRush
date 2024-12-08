import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function checkoutSessionController(req, res, next){
    const { user } = req;
    const { deliveryAddress, total, cart, successUrl, cancelUrl } = req.body;

    try{
        const lineItems = cart?.products.map(product => ({
            price_data: {
                currency: product.price.currency,
                product_data: { 
                    name: product.name, 
                    description: product.description,
                    images: [product.imageUrl] 
                },
                unit_amount: Math.round(product.price.amount * 100),
            },
            quantity: product.qty,
        }));
    
        console.log("products", cart.products);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            metadata: {
                userId: user._id,
                deliveryAddress,
                total: JSON.stringify(total),
                products: JSON.stringify(
                    cart.products?.map(product => ({productId: product._id, qty: product.qty}))
                )
            },
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        
        // return created session's id
        res.json({ sessionId: session.id });
    }
    catch(err){
        next({err});
    }
}