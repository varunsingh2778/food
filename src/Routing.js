import React from 'react'
import { Routes, Route } from "react-router-dom";
import About from './components/0Auth/About';
import Cart from './components/0Auth/Cart';
import Dashboard from './components/0Auth/Dashboard';
import Orders from './components/0Auth/orders';
import Payment from './components/0Auth/payment';
import Product from './components/0Auth/Product';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Loading from './Loading';
import PageNotFound from './PageNotFound';



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
          <Route path = "/dashboard/myorders" element = {<Orders/>}/>
          <Route path="/dashboard/cart" element={<Cart/>}/>
          <Route path = "/dashboard/about" element={<About/>}/>
          <Route path = "/dashboard/payment" element = {<Payment/>}/>
        </Route>
        <Route path="*" element ={<PageNotFound/>}/>
      </Routes>
    </>
  )
}
export default Routing