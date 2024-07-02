import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/CartProduct';
import emptyCartImg from '../asset/empty.gif';
import toast, { Toaster } from 'react-hot-toast';
import {loadStripe} from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const productCartItem = useSelector((state) =>state.product.cartItem);

    console.log(productCartItem);

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
    const navigate = useNavigate();

//payment gateway

const user = useSelector(state => state.user);

    const handlePayment =async() =>{

      if(user.email){

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        // console.log(stripePromise);
  
        // console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/payment/checkout-payment`,{
          method: "POST",
          headers:{
            "content-type" : "application/json",
          },
          body:JSON.stringify(productCartItem)
        })
  
        if(res.statusCode === 500) return;
        // if (!res.ok) {
        //   console.error('Failed to create checkout session', res.status, res.statusText);
        //   toast.error('Failed to create checkout session');
        //   return;
        // }
  
        const data = await res.json();
  
        console.log(data);
  
        toast("Redirecting to Payment Gateway.....");
  
        stripePromise.redirectToCheckout({sessionId : data}) 
       
        
      }
      else{
        toast("You have not logged in!");
        setTimeout(() =>{
       navigate("/login");
        },1000)
      }
  
      

    }  

  return (
    <>
    
    <div className="p-2 md:p-4 ">
    {productCartItem[0] ?
    (
      <>
     <h2 className="text-lg md:text-2xl font-bold text-slate-600">Your Cart Items</h2>
     <div className="my-4 flex gap-3">
        {/* Display cart items */}
        <div className="w-full max-w-3xl">
        {productCartItem.map((el) =>{
            return (
                <CartProduct key={el._id} id={el._id} name={el.name} image={el.image} price={el.price} category={el.category} qty={el.qty} total={el.total}/>
            )
        })}
        </div>

        {/* total cart items */}
        <div className="w-full max-w-md ml-auto">
            <h2 className="bg-green-600  text-white p-1 py-2 text-lg font-bold">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
           <p>Total Qty : </p>
           <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full  py-2 text-lg border-b">
           <p>Total Price : </p>
           <p className="ml-auto w-32 font-bold">{totalPrice}</p>
            </div>
            <button className="bg-green-900 font-bold w-full text-white py-2 hover:bg-green-400" onClick={handlePayment}>Payment</button>
        </div>
    </div>
    </>
    )
    : 
    <>
    <div className="flex w-full justify-center items-center flex-col">
      <img src={emptyCartImg} className="w-full max-w-sm"/>
      <p className="text-slate-700 font-bold text-xl">Oops! Your Cart is Empty!</p>
    </div>
    </>
    
}
    </div>

    </>
  )
}

export default Cart
