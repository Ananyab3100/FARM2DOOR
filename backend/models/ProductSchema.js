const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    category:String,
    image: String,
    price : String,
    description : String,
})

const productModel = mongoose.model("product" , productSchema);
module.exports = productModel ;