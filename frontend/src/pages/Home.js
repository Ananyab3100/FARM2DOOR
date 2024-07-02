import React, { useRef,useState,useEffect } from 'react'
import cycleicon from"../asset/cycle-icon.png";
import {useDispatch, useSelector} from "react-redux";
import HomeCard from '../component/Homecard';
import CardFeature from '../component/CardFeature';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';
import AllProduct from './AllProduct';




const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  
  const homeProductCartList = productData.slice(0,4);
  // console.log(homeProductCartList);
  const homeProductCartListVegetables = productData.filter((el) => el.category === "vegetable",[]);
  // console.log(homeProductCartListVegetables);

  const loadingArray = new Array(4).fill(null);

  const slideProductref = useRef();

  const nextProduct = () =>{
    slideProductref.current.scrollLeft += 200;
  }

  const prevProduct = () =>{
    slideProductref.current.scrollLeft -= 200;
  }


  // console.log(categoryList);


  


  return (
    <div className ="p-2 md:p-4">
      <div className="md:flex gap-4 py-3">
        <div className='md:w-1/2'>
        <div className="flex gap-3 w-36 bg-slate-300 rounded-full flex items-center px-2">
          <p className ="text-sm font-medium  text-slate-900">Bike Delivery</p>
          <img src={cycleicon} className ="h-7"></img>
        </div>
          <h2 className="text-7xl  font-bold md:text-7xl py-3">Fastest Delivery at <span className="text-green-700">Your Home</span></h2>
          <p className = "py-4 text-base">Experience the freshest produce and gourmet groceries delivered right to your doorstep. From farm to table, our quality and speed are unmatched. Enjoy a hassle-free shopping experience with a wide variety of fruits, vegetables, and everyday essentials. Eat fresh, live well, and let us bring the market to you!</p>
          <button  className =" font-bold p-3 text-white bg-green-600 rounded cursor-pointer mt-7">Order now</button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
        { homeProductCartList[0] ? homeProductCartList.map((el) =>{
          return (
            <HomeCard key={el._id} id={el._id} image={el.image} name={el.name} price={el.price} category ={el.category}/>
          )
        }) 
        : loadingArray

        }
        
        </div>
      </div>

      <div className="">
      <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-slate-800">Fresh vegetables</h2>
        <div className ="ml-auto flex gap-4">
         <button className= "bg-slate-300 hover:bg-slate-400 p-1 rounded" onClick={prevProduct}><GrPrevious /></button>
          <button className= "bg-slate-300 hover:bg-slate-400 p-1 rounded" onClick= {nextProduct}><GrNext /></button>
        </div>
        </div>
        <div className ='flex gap-5 overflow-scroll scrollbar-none  scroll-smooth'  ref={slideProductref}>
        {
          homeProductCartListVegetables.map((el) =>{
            return(
              <CardFeature key={el._id} name={el.name} category={el.category} image={el.image} price={el.price} id={el._id}/>
            )
          })
        }
        </div>
      </div>

      <AllProduct heading={"Your Product"}/>

 
   
    </div>
  )
}

export default Home
