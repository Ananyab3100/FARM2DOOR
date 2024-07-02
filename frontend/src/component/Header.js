import React, { useState } from 'react';
import logo from "../asset/farm-logo.png";
import {Link} from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import {useSelector,useDispatch} from "react-redux";
import { logoutRedux } from '../redux/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";

const Header = () => {

const [showMenu, setShowMenu] = useState(false);
const userData = useSelector((state) => state.user);
// console.log(userData);
// console.log(userData.email);
const dispatch = useDispatch();
const navigate = useNavigate();


 const handleShowMenu =() => {
  setShowMenu(!showMenu);
 }

 const handleLogout = () =>{
  dispatch(logoutRedux());
  setShowMenu(false);
  toast("Successfully Logged Out!")
  setTimeout(() =>{
  navigate("/login")
  },1000)
 }


//  console.log(process.env.REACT_APP_ADMIN_EMAIL);

const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className ="fixed shadow-md w-full h-20 md:px-4 z-50 bg-white">
   
   
    {/*desktop */}
    <div className="flex  items-center justify-between">

    <Link to="/">
    <div className ="h-20 p-2">
    <img  src={logo} className= "h-full cursor-pointer"/>
    </div>
    </Link>

    <div className ="flex items-center gap-4 md:gap-7">
      <nav className ="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
        <Link to="/">Home</Link>
        <Link to="/menu/6671917c16764ccc4f063346">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>


    <div className="text-2xl text-slate-600 relative cursor-pointer">
    <Link to={'/cart'}>
    <FaShoppingCart />
    <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">{cartItemNumber.length}</div>
    </Link>
    </div>

     <div className="text-slate-600">
    <div className="text-3xl h-10 w-10 rounded-full overflow-hidden  cursor-pointer drop-shadow-md flex justify-center items-center"  onClick={handleShowMenu}>
    { userData.image ? <img src={userData.image}/> :<HiOutlineUserCircle />}
    </div>
    

    {showMenu && (
       <div className="absolute right-2 bg-white py-2 px-5 shadow drop-shadow-md  flex flex-col min-w-[120px] text-center">
      {
      process.env.REACT_APP_ADMIN_EMAIL === userData.email &&  
      (<Link to="/newproduct" onClick={() =>setShowMenu(false)} className="cursor-pointer">New product</Link>)
      }
       
       {
        userData.image ? <p className="cursor-pointer" onClick={handleLogout}>Logout</p>: (<Link to="/login" onClick={() =>setShowMenu(false)} className="cursor-pointer">
        Login</Link>
      )}
        <nav className ="gap-4 text-base md:gap-6 md:text-lg flex flex-col md:hidden">
        <Link to="/" className ="px-2 py-1">Home</Link>
        <Link to="/menu/6671917c16764ccc4f063346" className ="px-2">Menu</Link>
        <Link to="/about" className ="px-2">About</Link>
        <Link to="/contact" className ="px-2">Contact</Link>
      </nav>
       
       </div>
    )}
    
    </div>
    </div>

    </div>

   
    </header>
    
  )
}

export default Header
