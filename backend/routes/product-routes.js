const express = require ("express");
const productRouter = express.Router();

const productModel = require("../models/ProductSchema");

//save product in database


productRouter.post("/uploadProduct", async(req,res) =>{
   // console.log(req.body);

   const data = await productModel(req.body);
   const datasave = await data.save();


   res.status(201).json({message: "Uploaded successfully"});
    
})

productRouter.get("/getproducts", async(req,res) =>{

const dataRes = await productModel.find({})
const data = JSON.stringify(dataRes);
res.send(data)
})

module.exports =  productRouter;