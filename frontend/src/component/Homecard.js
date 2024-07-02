import React from 'react'

const HomeCard = ({name, image, category, price,id}) => {
  return (
    <div className="bg-white p-2 rounded shadow-md">
      <div className="w-40 min-h-[180px]" >
        <img src={image} className="h-full w-full"/>
      </div>
      <h3 className="text-center font-semibold capitalize text-slate-600 text-lg" >{name}</h3>
      <p className="text-center text-slate-500 font-medium">{category}</p>
      <p className="text-center text-black-500 font-bold font-medium"><span className="text-red-500">₹ </span>{price}</p>
    </div>
  )
}

export default HomeCard
