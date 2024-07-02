import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AllProduct from './AllProduct';
import { addCartItem } from '../redux/productSlice';


const Menu = () => {
  const navigate = useNavigate();
  const {filterby} = useParams();
 const productData = useSelector((state) => state.product.productList);
//  console.log(productData);

 const productDisplay = productData.filter((el) => el._id === filterby)[0];

//  console.log(productDisplay);
//  console.log(productDisplay.image);

 const dispatch = useDispatch();
 const handleAddCartProduct = (e) =>{
  
  dispatch(addCartItem(productDisplay));
  }

  const handleBuy = () =>{
   navigate("/cart");
  }

  return (
    <div className="p-2 md:p-4">
<div className= "w-full max-w-4xl bg-slate-400 m-auto md:flex bg-white">
<div className="max-w-sm overflow-hidden w-full p-5">
  <img src={productDisplay.image} className="hover:scale-105 transition-all"/>
</div>
<div className='flex flex-col gap-2 p-4'>
<h3 className=" font-semibold capitalize text-slate-600 text-lg md:text-4xl" >{productDisplay.name}</h3>
<p className=" text-slate-500 font-medium md:text-xl">{productDisplay.category}</p>
 <p className=" text-black-500 font-bold font-medium md:text-2xl"><span className="text-red-500">₹ </span>{productDisplay.price}</p>
<div className="flex gap-3">
<button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 px-5  min-w-[100]" onClick={handleBuy}>Buy</button>
<button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 px-5  min-w-[100]" onClick={handleAddCartProduct}>Add to Cart</button>
</div>
<div>
  <p className="text-slate-600 font-medium">Description :</p>
  <p>{productDisplay.description}</p>
</div>
</div>
  </div>

  <AllProduct heading={"Related Products"}/>
    </div>
  )
}

export default Menu
