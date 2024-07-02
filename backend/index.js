const express = require ("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Stripe = require("stripe");

const userRouter = require("./routes/user-routes");
const productRouter = require ("./routes/product-routes");
const paymentRouter = require("./routes/payment-routes")

const app = express();

app.use(cors());
app.use(express.json());
// Increase the payload size limit
app.use(bodyParser.json({ limit: '100mb' })); // You can adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


const PORT = process.env.PORT || 8080

//mongodb connection
mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("Connected to database!")
})
.catch((err) =>{
    console.log(err);
});




//api
app.get("/",(req,res) =>{
res.send("server is running")
});



app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/payment",paymentRouter)


app.listen(PORT, () =>{
    console.log("Server is running at port " + PORT)
});
