import React ,{ useRef,useState,useEffect } from 'react';
import FilterProduct from '../component/FilterProduct';
import CardFeature from '../component/CardFeature';
 import {useDispatch, useSelector} from "react-redux";

const AllProduct = ({heading}) => {

    const productData = useSelector((state) => state.product.productList);

    const categoryList = [...new Set(productData.map((el)=> el.category))];

      //filterdata display

    const[filterby, setFilterby] = useState("");
  const[dataFilter, setDataFilter] = useState([]);
  // console.log(productData);
  // console.log(dataFilter);

  useEffect(() =>{
setDataFilter(productData);
  },[productData])

  

  const handleFilterProduct = (category) =>{
    setFilterby(category);
    const filter = productData.filter((el) =>el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(() =>{
    return(
      [...filter]
    )
  })

  }
  return (
    <div className="my-5">
    <h2 className="font-bold text-2xl text-slate-800 mb-4">
     {heading}
    </h2>
  
    <div className="flex gap-4 justify-center overflow-scroll scrollbar-none  scroll-smooth">
      {
       categoryList[0] &&  categoryList.map((el) =>{
        return(
          <FilterProduct category={el} key={el} isActive={el.toLowerCase() === filterby.toLowerCase()} onClick={() => handleFilterProduct(el)}/>
        )
       })
      }
  
    </div>
  
    <div className="flex flex-wrap justify-center gap-5">
      {
        dataFilter.map((el) => {
          return(
            <CardFeature key={el._id} name={el.name} category={el.category} image={el.image} price={el.price} id={el._id}/>
          )
        })
      }
  
    </div>
  
  
     </div>
  )
}

export default AllProduct
