import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [searchData,setSearchData] = useState([]);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate('/login')
  }
  let tokenid;
  const handleInput = (e) => {
    // console.log(e.target.value)
    const getSearch = async () => {
      try {
        let ans = await axios.post("https://food-app-hai.herokuapp.com/api/user/getAllProducts", {
          search: (e.target.value)
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
    getSearch();
  }
  useEffect(() => {
    tokenid = JSON.parse(localStorage.getItem('Token'))
    if (!tokenid) {
      navigate('/login')
    }
  })

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
          "cursor": "pointer"
        }}><h3><Link to="/dashboard">FOOD CART</Link></h3></div>
        <div className="input-group mb-3" style={{
          "width": "50%",
          "justifyContent": "sp"
        }}>
          <input type="text" className="form-control" placeholder="Search Items here" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleInput}>

          </input>
          <button className="btn btn-outline-secondary" type="button" style={{ "marginLeft": "3px" }}>Search</button>

        </div>
        <div>
          <Link to=""><h1 style={{
            "marginTop": "10px",
            "marginRight": "40px"
          }}><button type="button" className="btn btn-dark" onClick={() => { handleLogout() }}>Log Out</button></h1></Link>
        </div>
      </header>
      <div style={{
        "display": "flex"
      }}>
        <div style={{
          "width": "200px",
          "backgroundColor": "black",
          "height": "100vh",
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
            <li><Link to="/dashboard/about">About</Link></li>
          </ul>
        </div>
        <div style={{
          "width": "100%",
          "padding": "10px",
        }}>
          <Outlet context={[searchData]}/>
        </div>
      </div>
    </div>
  );
}

