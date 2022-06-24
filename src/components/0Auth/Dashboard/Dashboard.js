import { config } from '../../../Axiosconfig';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../Dashboard/Dashboard.css'

export default function Dashboard() {
  const [searchData, setSearchData] = useState([]);
  const [displayCart, setDisplayCart] = useState(0);
  const [cartDataItems, setCartDataItems] = useState([]);
  const [input, setInput] = useState([]);
  const [total, setTotal] = useState(0)
  const navigateTo = useNavigate();

  useEffect(() => {
    let tokenid = JSON.parse(localStorage.getItem('Token'))
    if (!tokenid) {
      navigateTo('/login')
    }
    getCartItem();
  }, [])
  useEffect(() => {
    const getCartItem = async () => {
      try {
        let products = await config().get(`/user/getAllCarts`)
        setTotal(products.data.data.results.total);
      } catch (e) {
        console.log(e)
      }
    }
    getCartItem();
  }, [])

  useEffect(() => {
    handleInput();
  }, [input])

  const handleOnChange = (e) => {
    setInput(e.target.value)
  }

  const handleAddtoCart = async (a) => {
    try {
      let products = await config().post(`/user/addToCart`, {
        "productId": a,
      })
      setDisplayCart(products?.data?.data?.items.length)
      setTotal(products?.data?.data.total)
      setCartDataItems(products?.data?.data?.items)
    } catch (e) {
      console.log(e)
    }
  }
  const removeCart = async (a) => {
    try {
      let products = await config().delete(`/user/removeItemsFromCart/${a}`)
      setCartDataItems(products.data.data.items)
      setTotal(products.data.data.total)
      setDisplayCart(products.data.data.items.length)
    } catch (e) {
      console.log(e)
    }
  };

  const clearCart = async () => {
    try {
      let products = await config().delete(`/user/clearCart`)
      setCartDataItems(products.data.data.items)
      setTotal(0)
      setDisplayCart(0)

    } catch (e) {
      console.log(e)
    }
  }

  const handleLogoutBtn = () => {
    localStorage.removeItem("Token");
    navigateTo('/login')
  }

  const handleInput = async () => {
    if (input.length > 0) {
      try {
        let ans = await config().post(`/user/getAllProducts`, {
          search: input,
        })
        setSearchData(ans?.data?.data?.products);
      } catch (err) {
        console.log(err)
      }
    }

  }
  const getCartItem = async () => {
    try {
      let products = await config().get(`/user/getAllCarts`)
      setDisplayCart(products.data.data.results.items.length);
    } catch (e) {
      console.log(e)
    }
  }

  const emptyCart = async () => {
    try {
      let products = await config().get(`/user/getAllCarts`)
      setCartDataItems(products.data.data.results.items);
      setDisplayCart(0);
      setTotal(0)
    } catch (e) {
      console.log(e)
    }
  }

  const placedOrder = async (a) => {
    try {
      const url2 = await config()
        .post(
          `/user/placeOrder`,
          {
            _id: a
          }
        )
        .then((result) => {
          emptyCart();
          window.alert("Congradulations 🥳🥳,Order Successfull !!!");
          navigateTo('/dashboard/product');
        });
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className='dashboardContainer'>
      <header className='dashHeader'>
        <div className='dashDiv'><h3><Link to="/dashboard"><b>FOOD CART</b></Link></h3></div>
        <div className="input-group mb-3" id='dashdiv1'>
          <input type="text" className="form-control" placeholder="Search Items here" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleOnChange}>
          </input>
        </div>
        <button type="button" className="btn btn-primary position-relative" onClick={() => navigateTo('/dashboard/cart')}>
          <ShoppingCartIcon />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {displayCart}
          </span>
        </button>

        <div>
          <h1 className='DashLogout'><button type="button" className="btn btn-dark" onClick={() => handleLogoutBtn()}>Log Out</button></h1>
        </div>
      </header>
      <div className='dashSiderBox'>
        <div className='siderDiv'>
          <ul className='siderUl'>
            <li><Link to="/dashboard/product">Product</Link></li>
            <li><Link to="/dashboard/cart">Cart</Link></li>
            <li><Link to="/dashboard/myorders">My Orders</Link></li>
            <li><Link to="/dashboard/about">About</Link></li>
          </ul>
        </div>
        <div className='dashOutlet'>
          <Outlet context={[removeCart, handleAddtoCart, clearCart, placedOrder, searchData, cartDataItems, displayCart, total, input]} />
        </div>
      </div>
    </div>
  );
}