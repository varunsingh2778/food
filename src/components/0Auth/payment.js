import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

function Payment() {
    const[total,setTotal] = useState(0);
    const[id,setId] =useState(0)
    const [removeCart, handleAddtoCart,clearCart, placedOrder,searchData, cartDataItems,displayCart] = useOutletContext();
    useEffect(() => {
        let tokenid = JSON.parse(localStorage.getItem("Token"));
        const getCartItem = async () => {
            try {
                let products = await axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts", {
                    headers: {
                        Authorization: 'Bearer ' + tokenid
                    }
                })
                setTotal(products.data.data.results.total)
                setId(products.data.data.results._id)

            } catch (e) {
                console.log(e)
            }
        }
        getCartItem();
    },[])

    
    return (
        <>
        <div className="container px-3 my-5 clearfix">
        <div className="card">
          <div className="card-header d-flex justify-content-center">
            <h2>Payment</h2>
          </div>
          <div className="card-body">
            <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
              <div className="d-flex">
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">
                    Total Price
                  </label>
                  <div style={{"fontSize":"30px"}}>
                    <strong>₹ {total}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-lg btn-primary mt-2" onClick={()=>placedOrder(id)} >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Payment