import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { increaseQty } from '../redux/productSlice';
import { decreaseQty } from '../redux/productSlice';
import { deleteCartItem } from '../redux/productSlice';

const CartProduct = ({id, name, image,category,price,qty, total}) => {
const dispatch = useDispatch();


  return (
    
      <div className="bg-slate-200 p-2 flex rounded overflow-hidden border-2 border-slate-300">
        <div className="bg-white">
         <img src={image} className="h-32 w-36 object-cover p-3"/>
        </div>
        <div className='flex flex-col gap-2 p-4 w-full'>
          <div className="flex justify-between">
          <h3 className=" font-semibold capitalize text-slate-600 text-lg md:text-xl" >{name}</h3>
<div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={() =>dispatch(deleteCartItem(id))}>
<MdDelete />
</div>
          </div>

<p className=" text-slate-500 font-medium md:text-base">{category}</p>
 <p className=" text-black-500 font-bold font-medium md:text-lg"><span className="text-red-500">₹ </span>{price}</p>


<div className="flex justify-between ">
<div className="flex gap-3 align-items justify-center">
<button className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 px-1  min-w-[100] "
onClick ={() =>dispatch(increaseQty(id))}><FaPlus /></button>
<p className="font-semibold text-xl p-1">{qty}</p>
<button className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 px-1  min-w-[100] "
onClick ={() =>dispatch(decreaseQty(id))}><FaMinus /></button>
</div>

<div className="flex items-center font-bold text-slate-700">
  <p>Total :  </p>
  <p><span className="text-red-500">₹ </span>{total}</p>
</div>
</div>


</div>
      </div>
  
  )
}

export default CartProduct
