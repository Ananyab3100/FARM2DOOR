
import './App.css';
import Header from './component/Header';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import Signup from './pages/Signup';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import {setDataProduct} from './redux/productSlice.js';
import {useDispatch, useSelector} from "react-redux";
import Cart from './pages/Cart.js';
import Success from './pages/Success.js';
import Cancel from './pages/Cancel.js';

function App() {
    
const dispatch = useDispatch();
const productData = useSelector((state) => state.product)
//console.log(productData);
  useEffect(() =>{
    (async() =>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product/getproducts`);
      const resData =  await res.json();
      // console.log(resData);
      dispatch(setDataProduct(resData));

    })()
  },[])

  return (
    <>
     <Toaster />
    <div className="App">
      <Header/>
      <div className="pt-20 bg-white"></div>
      <div className="bg-slate-100 min-h-[calc(100vh)] z-0">
       <Routes>
       <Route path ="/" element={<Home/>}/>
       {/* <Route path ="/menu" element={<Menu/>}/> */}
       <Route path ="/menu/:filterby" element={<Menu/>}/>
       <Route path ="/about" element={<About/>}/>
       <Route path ="/contact" element={<Contact/>}/>
       <Route path ="/login" element={<Login/>}/>
       <Route path ="/newproduct" element={<NewProduct/>}/>
       <Route path ="/cart" element={<Cart/>}/>
       <Route path ="/signup" element={<Signup/>}/>
       <Route path ="/success" element={<Success/>}/>
       <Route path ="/cancel" element={<Cancel/>}/>
      </Routes>
      </div>
    </div>
    </>
  );
}

export default App;
