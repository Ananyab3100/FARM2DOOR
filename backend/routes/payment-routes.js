const express = require ("express");
const paymentRouter = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY);
// console.log(stripe);



paymentRouter.post("/checkout-payment",async(req,res) =>{
// console.log(req.body);


try{

    const params = {
     submit_type : 'pay',
     mode: "payment",
     payment_method_types: ["card"],
    //  billing_address_collection : "auto",
     billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
     shipping_options : [{
        shipping_rate : "shr_1PXmISSBId12CRlHRpjRpUBk"
     }],
     line_items : req.body.map((item) =>{
        return{
            price_data : {
                currency: "inr",
            
            product_data :{
                name:item.name,
                // image: [item.image],
            },
            unit_amount : item.price * 100,
        },
        adjustable_quantity :{
            enabled : true,
            minimum : 1,
        },
        quantity : item.qty,
        }
     }),

     success_url : `${process.env.FRONTEND_URL}/success`,
     cancel_url : `${process.env.FRONTEND_URL}/cancel`
     
    }
    // console.log("Stripe session params:", params);
    
    const session = await stripe.checkout.sessions.create(params);
    // console.log("Stripe session created:", session);

    // console.log(session)
    res.status(200).json(session.id);

    // res.status(200).json({ sessionId: session.id }); 

}
catch(err){
res.status(err.statusCode || 500).json(err.message)
}

})

module.exports =  paymentRouter;




