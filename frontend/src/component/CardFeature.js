import React from 'react'
import { Link } from 'react-router-dom';
import { addCartItem} from "../redux/productSlice";
import { useDispatch } from 'react-redux';

const CardFeature = ({name, image, category, price, id}) => {

  const  dispatch = useDispatch();

  const handleAddCartProduct = (e) =>{
  e.stopPropagation();
  dispatch(addCartItem({
    _id : id,
    name: name,
    image: image,
    price: price,
    category: category
  }));
  }

  return (
    <div className= "w-full min-w-[200px] max-w-[200px] bg-white drop-shadow-lg px-4 py-5 hover:shadow-lg cursor-pointer flex flex-col mt-5">
      { image ? (
        <>
        <Link to={`/menu/${id}`}  onClick={() => window.scrollTo({top:"0", behavior : "smooth"})}>
      <div className="h-28  flex flex-col justify-center items-center">
        <img src={image} className="h-full"/>
      </div>
   
      <h3 className=" font-semibold capitalize text-slate-600 text-lg my-4 white-space-nowrap overflow-hidden" >{name}</h3>
      <p className="text-slate-500 font-medium">{category}</p>
      <p className="text-black-500 font-bold font-medium"><span className="text-red-500">₹ </span>{price}</p>
      </Link>
      <button className="w-full bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600" onClick={handleAddCartProduct}>Add to Cart</button>
      
      </>
    ) : (<></>)}
    </div>
  )
}

export default CardFeature
