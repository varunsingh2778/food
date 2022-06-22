import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import axios from 'axios'
import Loading from '../../Loading'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Cart = () => {
  const [allItems, setAllItems] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigateTo = useNavigate();
  const [removeCart, handleAddtoCart, clearCart, placedOrder, searchData, cartDataItems, displayCart, total] = useOutletContext();
  useEffect(() => {
    setSpinner(true)
    let tokenid = JSON.parse(localStorage.getItem("Token"));
    const getCartItem = async () => {
      try {
        let products = await axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts", {
          headers: {
            Authorization: 'Bearer ' + tokenid
          }
        })
        setAllItems(products.data.data.results.items);
        setSpinner(false)
      } catch (e) {
        console.log(e)
        setSpinner(false)
      }
    }
    getCartItem();

  }, [cartDataItems])

  const checkOut = () => {
    if (cartDataItems.length > 0 || allItems.length > 0) {
      navigateTo('/dashboard/payment')
    } else {
      alert("Please Add Items in the Cart")
    }
  }

  const plusItem = (a) => {
    handleAddtoCart(a);
    setAllItems(cartDataItems)

  }

  const removed = (id) => {
    removeCart(id);
    setAllItems(cartDataItems)

  }
  return <>
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({displayCart} items)
          </Heading>
          <Stack spacing="6">
            {spinner ? <Loading /> :
              displayCart === 0 ? <Heading fontSize="4xl" fontWeight="extrabold">
                No Items in the Cart 💁
              </Heading>

                :
                cartDataItems.length > 0 ?
                  cartDataItems.map((item, index) => (
                    <div key={index} style={{ border: "1px solid", padding: "20px", alignItems: "center", textAlign: "center" }}>
                      <span>
                        <img src={item.image} alt="" style={{ height: "60px", marginLeft: "45%" }} />
                        <pre>
                          {item.title} <b>Price: ₹ {item.price}</b><br /><b>Delivery Charges ₹ {item.deliveryCharges}</b>
                        </pre>

                        <pre>
                          <button type="button" className="btn btn-danger" onClick={() => removed(item._id)}>-</button>

                          &nbsp;Quantity : {item.quantity}&nbsp;
                          <button type="button" className="btn btn-success" onClick={() => plusItem(item._id)}>+</button>
                        </pre>
                      </span>
                    </div>
                  ))
                  :
                  allItems.map((item, index) => (
                    <div key={index} style={{ border: "1px solid", padding: "20px", alignItems: "center", textAlign: "center" }}>
                      <span>
                        <img src={item.image} alt="" style={{ height: "60px", marginLeft: "45%" }} />
                        <pre>
                          {item.title} <b>Price: ₹ {item.price}</b><br /><b>Delivery Charges ₹ {item.deliveryCharges}</b>
                        </pre>

                        <pre>
                          <button type="button" className="btn btn-danger" onClick={() => removed(item._id)}>-</button>

                          &nbsp;Quantity : {item.quantity}&nbsp;
                          <button type="button" className="btn btn-success" onClick={() => plusItem(item._id)}>+</button>
                        </pre>
                      </span>
                    </div>
                  ))}
          </Stack>
          <button type="button" className="btn btn-primary" onClick={() => clearCart()}>Clear Cart</button>
        </Stack>

        <Flex direction="column" align="center" flex="1" border="1px">
          <div style={{ "marginTop": "0px", "padding": "7px" }}>
            <h1 style={{ "fontSize": "20px" }}><b>Order Summary</b></h1>
            <div style={{ "justifyContent": "space-between", "marginTop": "25px", "display": "flex" }}><h2>Subtotal Items</h2><h2>{displayCart}</h2></div>

            <div style={{ "justifyContent": "space-between", "marginTop": "7px", "fontSize": "30px", "display": "flex" }}><h1>Total</h1>&nbsp;<h1>{total}</h1></div>
            <button type="button" className="btn btn-primary" onClick={() => checkOut()}>Proceed to CheckOut</button>
          </div>

          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode('blue.500', 'blue.200')} onClick={() => navigateTo('/dashboard/')}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>

  </>

}
export default Cart