import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,Outlet, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Dashboard() {
  const [searchData, setSearchData] = useState([]);
  const[displayCart,setDisplayCart] = useState(0);
  const[cartDataItems,setCartDataItems] = useState([]);
  const[input,setInput] = useState([]);
  const[total,setTotal]= useState(0)
  const navigateTo = useNavigate();

  useEffect(() => {
   let tokenid = JSON.parse(localStorage.getItem('Token'))
    if (!tokenid) {
      navigateTo('/login')
    }
    getCartItem();
  },[])
  useEffect(()=>{
    let tokenid = JSON.parse(localStorage.getItem("Token"));
    const getCartItem = async () => {
      try {
        let products = await axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts", {
          headers: {
            Authorization: 'Bearer ' + tokenid
          }
        })
        setTotal(products.data.data.results.total); 
      } catch (e) {
        console.log(e)
      }
    }
    getCartItem();
  },[])

  useEffect(()=>{
    handleInput();
  },[input])

  const handleOnChange = (e)=>{
    setInput(e.target.value)
  }
  

  const handleAddtoCart= async(a)=>{
    let tokenid = JSON.parse(localStorage.getItem("Token"));
      try {
        let products = await axios.post("https://food-app-hai.herokuapp.com/api/user/addToCart", {
          "productId":a,
        }, {
          headers: {
            'Authorization': 'Bearer ' + tokenid
          }
        })
        setDisplayCart(products?.data?.data?.items.length)
        setTotal(products?.data?.data.total)
        setCartDataItems(products?.data?.data?.items)
      } catch (e) {
        console.log(e)
      }
    }

    // const demoFunc=(a)=>{
    //   console.log("Dashboard ka demoFunc",a)
    // }
    
  const removeCart = async (a) => {
    const token = JSON.parse(localStorage.getItem("Token"));
    try {
      let products = await axios.delete(`https://food-app-hai.herokuapp.com/api/user/removeItemsFromCart/${a}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      setCartDataItems(products.data.data.items)
      setTotal(products.data.data.total)
      setDisplayCart(products.data.data.items.length)
    } catch (e) {
      console.log(e)
    }
  };

  const clearCart = async()=>{
    // console.log("Inside Clear Cart")
    let tokenid = JSON.parse(localStorage.getItem("Token"));
    try {
      let products = await axios.delete("https://food-app-hai.herokuapp.com/api/user/clearCart", {
        headers: {
          Authorization: 'Bearer ' + tokenid
        }
      })
      // console.log(products.data.data.items);
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
  
  const handleInput = async() => {
    // console.log("inside HandleInput")
    if(input.length>0){
      try {
        let tokenid = JSON.parse(localStorage.getItem("Token"));
        let ans = await axios.post("https://food-app-hai.herokuapp.com/api/user/getAllProducts", {
          search: input,
          
        }, {
          headers: {
            'authorization': 'Bearer ' + tokenid
          }
        })
        setSearchData(ans?.data?.data?.products);
        // console.log(ans?.data?.data?.products);
      } catch (err) {
        console.log(err)
      }
    }
   
  }
  const getCartItem = async()=>{
    let tokenid = JSON.parse(localStorage.getItem('Token'))
    try {
      let products = await axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts",{
        headers: {
          Authorization: 'Bearer ' + tokenid
        }
      })
      // console.log(products.data.data.results.items);
      setDisplayCart(products.data.data.results.items.length);
    } catch (e) {
      console.log(e)
    }
  }

  const emptyCart = async()=>{
    let tokenid = JSON.parse(localStorage.getItem("Token"));
    try {
      let products = await axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts", {
        headers: {
          Authorization: 'Bearer ' + tokenid
        }
      })
      // console.log(products.data.data.results.items);
      setCartDataItems(products.data.data.results.items);
      setDisplayCart(0);
      setTotal(0)
    } catch (e) {
      console.log(e)
    }
  }

  const placedOrder = async(a)=>{
    //  console.log("inside order place function")
    let token = JSON.parse(localStorage.getItem("Token"));
    try {
        const url = await axios
            .post(
                "https://food-app-hai.herokuapp.com/api/user/placeOrder",
                {
                  _id:a
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => {
                // console.log(result.data.data);
                emptyCart();
                window.alert("Congradulations 🥳🥳,Order Successfull !!!");
                navigateTo('/dashboard/product');
            });
    } catch (e) {
        console.log(e);
    }   
}

  
  return (
    <div style={{
      "boxSizing": "border-box",
      "padding": "0",
      "margin": "0"
    }}>
      <header style={{
        "display": "flex",
        "justifyContent": "space-between",
        "padding": "14px",
        "backgroundColor": "skyblue",

      }}>
        <div style={{
          "marginTop": "10px",
          "marginLeft": "20px",
          "cursor": "pointer",
          "fontSize": "25px"
        }}><h3><Link to="/dashboard"><b>FOOD CART</b></Link></h3></div>
        <div className="input-group mb-3" style={{
          "width": "50%",
          "justifyContent": "sp",
          "marginTop": "10px",
        }}>
          <input type="text" className="form-control" placeholder="Search Items here" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleOnChange}>

          </input>
        </div>
        <button type="button" className="btn btn-primary position-relative" onClick={()=>navigateTo('/dashboard/cart')}>
          <ShoppingCartIcon/>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {displayCart}
          </span>
        </button>

        <div>
          <h1 style={{
            "marginTop": "10px",
            "marginRight": "40px"
          }}><button type="button" className="btn btn-dark" onClick={() => handleLogoutBtn()}>Log Out</button></h1>
        </div>
      </header>
      <div style={{
        "display": "flex"
      }}>
        <div style={{
          "width": "200px",
          "backgroundColor": "black",
          "minHeight": "100vh",
          "color": "white"
        }}>
          <ul style={{
            "listStyle": "none",
            "marginLeft": "20px",
            "fontFamily": "monospace",
            "fontSize": "20px",
            "cursor": "pointer",
            "marginTop": "10px",
            "paddingTop": "10px"
          }}>
            <li><Link to="/dashboard/product">Product</Link></li>
            <li><Link to="/dashboard/cart">Cart</Link></li>
            <li><Link to="/dashboard/myorders">My Orders</Link></li>
            {/* <li><Link to="/dashboard/payment">My Payment</Link></li> */}
            <li><Link to="/dashboard/about">About</Link></li>
          </ul>
        </div>
        <div style={{
          "width": "100%",
          "padding": "10px",
        }}>
          <Outlet context={[removeCart,handleAddtoCart,clearCart,placedOrder,searchData,cartDataItems,displayCart,total,input]}/>
        </div>
      </div>
    </div> 
  );
}