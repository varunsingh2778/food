import React from 'react'
import { Routes, Route } from "react-router-dom";
import About from './components/0Auth/About';
import Cart from './components/0Auth/Cart';
import Dashboard from './components/0Auth/Dashboard';
import Product from './components/0Auth/Product';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';



const Routing = () => {
  return (
    <>
    <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="/dashboard/" element ={<Product/>}/>
          <Route path = "/dashboard/product" element = {<Product/>}/>
          <Route path="/dashboard/cart" element={<Cart/>}/>
          <Route exact path = "/dashboard/about" element={<About/>}/>
        </Route>
      </Routes>
    </>
  )
}
export default Routing