import React from 'react';
import { useState } from 'react';
import loginSignupImage from "../asset/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import {Link} from "react-router-dom";
import { ImageToBase64 } from '../utility/imageToBase64';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Signup = () => {
    const navigate = useNavigate();
    const [ showPassword, setShowPassword] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName :"",
        lastName :"" ,
        email: "",
        password: "",
        confirmPassword : "",
        image:""
    });

    const handleOnChange = (e,prevState) =>{
       const {name, value} = e.target;
       setData((prevState) =>{
      return {...prevState,
      [name] : value
      }
       });
     
    }

    const handleUploadProfileImage = async(e) =>{
    // console.log(e.target.files[0]);
    const data = await ImageToBase64(e.target.files[0]);
    //console.log(data);

    setData((prev) =>{
        return {
            ...prev,
          image: data,
        }
    })
    }

    const handleSubmit = async(e)  =>{
       
        e.preventDefault();
    //  console.log(data);
     const {firstName, email, password, confirmPassword} = data;
     if(firstName && email && password && confirmPassword ){
        if(password == confirmPassword){

            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/signup`,{
                method: "POST",
                headers:{
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data),
                
            });

            const dataRes = await fetchData.json();
            console.log(dataRes);

            toast(dataRes.message);
  
            setData({
                firstName :"",
                lastName :"" ,
                email: "",
                password: "",
                confirmPassword : "" ,
                image: ""
            });
            if(dataRes.alert == true){
            navigate("/login");
            }
        }
        else{
            alert("Passwords don't match")
        }
     }
    }
   

  return (
<div className ="p-3 md:p-4 bg-white-200 ">
   <div className="w-full max-w-sm bg-white m-auto p-4 flex items-center flex-col p-4">   
    <div className="w-20 h-20 overflow-hidden shadow-md drop-shadow-md rounded-full">
        <img src={data.image ?data.image :loginSignupImage} className="w-full"/>

        <label htmlFor="profileImage">
        <div className="absolute bottom-0 h-1/3  w-full bg-slate-500 bg-opacity-50 cursor-pointer">
            <p className="text-sm text-center text-white">Upload</p>
        </div>
        <input type={"file"} id ="profileImage" className="hidden" onChange={handleUploadProfileImage}></input>
        </label>
   </div>  
    <form className="w-full py-3 flex flex-col">
        <label htmlFor="firstName" className="">First name</label>
        <input type="text" id = "firstName" name="firstName" value={data.firstName} onChange={handleOnChange} className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"/>

        <label htmlFor="lastName" className="">Last name</label>
        <input type="text" id = "lastName" name="lastName" value={data.lastName} onChange={handleOnChange} className="mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"/>

        
        <label htmlFor="email" className="">Email</label>
        <input type="email" id = "email" name="email" value={data.email} onChange={handleOnChange} className="mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"/>

        <label htmlFor="password" className="">Password</label>
        <div className="relative flex items-center">
        <input type= {showPassword ? "text" : "password"} id = "password" name="password" value={data.password} onChange={handleOnChange} className="mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded relative focus-within:outline-blue-300"/>
        {
            showPassword ? (<span className="rounded absolute right-1" onClick={() =>{setShowPassword(false)}}><BiHide /></span>)
            :
            (<span className="rounded absolute right-1" onClick={() =>{setShowPassword(true)}}><BiShow /></span>)
         } 
        
        </div>

        <label htmlFor="confirmPassword" className="">Confirm Password</label>
        <div className="relative flex items-center">
        <input type= {showConfirmPassword ? "text" : "password"} id = "confirmPassword" name="confirmPassword"
         value={data.confirmPassword} 
         onChange={handleOnChange} 
         className="mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded relative focus-within:outline-blue-300"/>
        {
            showConfirmPassword ? (<span className="rounded absolute right-1" onClick={() =>{setShowConfirmPassword(false)}}><BiHide /></span>)
            :
            (<span className="rounded absolute right-1" onClick={() =>{setShowConfirmPassword(true)}}><BiShow /></span>)
         } 
        
        </div>

        <button type="submit" className ="w-full max-w-[150px] bg-red-800 text-white text-xl font-semibold cursor-pointer rounded-full p-1 mt-3 m-auto"
        onClick ={handleSubmit}
        >Sign up</button>
        <p className="text-left mt-2 text-xs">Already have account? <Link to="/login" className="text-blue-500">Login</Link></p>


    </form>

    </div>
    </div>
  )
}

export default Signup
