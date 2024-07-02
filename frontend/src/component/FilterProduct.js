import React from 'react';
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({category, onClick,isActive}) => {
  return (
 <div onClick={onClick}>
  <div className={`text-3xl bg-yellow-500 rounded-full p-3 max-w-[54px] cursor-pointer ${isActive ? "bg-yellow-700 text-white" :"bg-yellow-500 " }`}>
  <CiForkAndKnife />
  </div>
 <p className="text-center font-medium my-1 capitalize">{category}</p>
</div>
  )
}

export default FilterProduct;

