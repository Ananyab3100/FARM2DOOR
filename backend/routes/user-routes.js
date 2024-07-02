const express = require ("express");
const userRouter = express.Router();
const userModel = require("../models/UserSchema")


userRouter.post("/signup" ,async(req,res) =>{
    // console.log(req.body);
    const {email} = req.body;
    let user;
    try{
        user = await userModel.findOne({email : email});
    }
    catch(err){
        console.log(err);
    }
    if(user){
        res.status(400).json({message : "Email id is already registered", alert:false})
    }
    else{
        const data = userModel(req.body);
        const save = data.save();
        res.status(200).json({message : "Successfully signed up", alert:true})
    }
   });

   userRouter.post("/login" ,async(req,res) =>{
//    console.log(req.body);

   const {email} = req.body;
  let user;
  
    user =  await userModel.findOne({email :email});
    let dataSend;
    if(user){
            dataSend = {
                _id: user._id,
                firstName : user.firstName,
                lastName : user.lastName,
                email:user.email,
                image: user.image,
            };
            res.status(200).json({message : "Successfully logged in", alert:true , data:dataSend})
    }
    else{
     res.status(500).json({message: "Email is not registered. Please signup" , alert:false, data:dataSend})
    }

   
})

module.exports =  userRouter;