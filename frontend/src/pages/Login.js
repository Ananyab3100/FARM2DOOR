import React from 'react';
import { useState } from 'react';
import loginSignupImage from "../asset/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {useSelector,useDispatch} from "react-redux";
import { loginRedux } from '../redux/userSlice'; 


const Login = () => {
  const navigate = useNavigate();

    const [ showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const userData = useSelector(state => state);
 

    const dispatch = useDispatch();

    const handleOnChange = (e,prevState) =>{
       const {name, value} = e.target;
       setData((prevState) =>{
      return {...prevState,
      [name] : value
      }
       });
     
    }

    const handleSubmit = async(e)  =>{
        e.preventDefault();
    //  console.log(data);
     const { email, password} = data;

     if( email && password){

      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/login`,{
        method: "POST",
        headers:{
            "content-type" : "application/json"
        },
        body : JSON.stringify(data),
        
        });
       
       const dataRes = await fetchData.json();
       console.log(dataRes);
      
      toast(dataRes.message);

         if(dataRes.alert == true){
          dispatch(loginRedux(dataRes));
          setTimeout(() =>{
            navigate("/");
          },1000)
         
         }
         else{
          alert("Please enter a valid email id")
         }
     }

     console.log(userData);

    
    //  setData({
    //   email: "",
    //   password: "",
    //  });
 

    }
   

  return (
<div className ="p-3 md:p-4 bg-white-200 ">
   <div className="w-full max-w-sm bg-white m-auto p-4 flex items-center flex-col p-4">   
    <div className="w-20 overflow-hidden shadow-md drop-shadow-md rounded-full">
        <img src={loginSignupImage} className="w-full"/>
   </div>  
    <form className="w-full py-3 flex flex-col">
        
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

        <button type="submit" className ="w-full max-w-[150px] bg-red-800 text-white text-xl font-semibold cursor-pointer rounded-full p-1 mt-3 m-auto"
        onClick ={handleSubmit}
        >Login</button>
        <p className="text-left mt-2 text-xs">Don't have account? <Link to="/signup" className="text-blue-500">Signup</Link></p>


    </form>

    </div>
    </div>
  )
}

export default Login

