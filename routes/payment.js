const router = require('express').Router();
const stripe = require("stripe")(process.env.SECRET_KEY)


router.post('/payment', (req,res)=>{

    const{product,token}=req.body;
   // console.log(req.body);
    console.log("PRODUCT",product)
    console.log("PRICE",product.price)
    //const idempontencyKey=uuidv4()
    //console.log(idempontencyKey);

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
            stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:`purchase of ${product.name}`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        })
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))

})

module.exports = router;