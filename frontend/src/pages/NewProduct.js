import React,{useState} from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from '../utility/imageToBase64';
import toast, { Toaster } from 'react-hot-toast';

const NewProduct = () => {

  const [data, setData] = useState({
    name:"",
    category:"",
    image:"",
    price :"",
    description : "",
  });

  const handleOnChange = (e) =>{
 
   const{name, value} = e.target;

   setData((prev) =>{
    return{
    ...prev,
    [name] : value
    }
   })
  }

  const handleUploadProfileImage = async(e) =>{
    // console.log(e.target.files[0]);
    const data = await ImageToBase64(e.target.files[0]);
    // console.log(data);

    setData((prev) =>{
      return {
          ...prev,
        image: data,
      }
  })

 }

 const handleSubmit = async(e) =>{
  e.preventDefault();
  // console.log(data);
  const {name, image, category, price} = data;

  if(name && image && category && price){
  
  const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product/uploadProduct`,{
    method: "POST",
    headers:{
        "content-type" : "application/json"
    },
    body : JSON.stringify(data),
  });
  const fetchRes = await fetchData.json();
  // console.log(fetchRes);
  toast(fetchRes.message);
}
else{
  toast("Enter required field");
}

setData(() =>{
return{
  name:"",
  category:"",
  image:"",
  price :"",
  description : "",
}  
})
 
 }

  return (
    <div className="p-4">
      <form className ="m-auto w-full max-w-md p-4 shadow flex flex-col bg-white" onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" id='name' className ="bg-slate-200 p-1 my-1 rounded" onChange={handleOnChange} value = {data.name}/>

        <label htmlFor='category' className="mt-1">Category</label>
        <select name="category" className ="bg-slate-200 p-1 my-1rounded" onChange={handleOnChange} value = {data.category}>
        <option value={"other category"}>Select Category</option>
          <option value={"fruit"}>Fruit</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"cake"}>Cake</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
        </select>


        <label htmlFor ="image" >Image
        <div  className ="h-40 w-full bg-slate-300  rounded flex items-center justify-center cursor-pointer">
          {data.image ? (<img className="h-full " src={data.image}/>) :(<span className="text-5xl"><BsCloudUpload/></span>) }
        
        
        <input type={"file"} id ="image" name="image" accept ="image/*" className="hidden" onChange={handleUploadProfileImage}/>
        </div>
        </label>

        <label htmlFor ="price" >Price</label>
        <input type="text" name="price" id='price' className ="bg-slate-200 p-1 my-1 rounded" onChange={handleOnChange} value = {data.price}/>

        <label htmlFor ="description" >Description</label>
        <textarea name="description" rows={2} className="bg-slate-200 p-1 my-1 rounded resize-none" onChange={handleOnChange} value = {data.description}></textarea>

        <button className=" bg-blue-400 hover:bg-blue-500 text-lg rounded font-semibold text-white cursor-pointer my-1">Save</button>
      </form>
    </div>
  )
}

export default NewProduct
