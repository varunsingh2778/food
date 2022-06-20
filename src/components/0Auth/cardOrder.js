import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
import axios from 'axios'
  import * as React from 'react'
  import { FaArrowRight } from 'react-icons/fa'
//   import { formatPrice } from './PriceTag'
  
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = () => {
    const [items,setItems] =React.useState([]);
    const[total,setTotal] = React.useState(0);
    const[delivery,setDelivery] = React.useState(0);
    React.useEffect(()=>{
    let tokenid = JSON.parse(localStorage.getItem("Token"));
    const getCartItem = async()=>{
      try {
        let products = await axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts",{
          headers: {
            Authorization: 'Bearer ' + tokenid
          }
        })
        // console.log(products.data.data.results.items[0].deliveryCharges);
        setItems(products.data.data.results)
        setTotal(products.data.data.results.items.length);
        setDelivery(products.data.data.results.items[0].deliveryCharges)
        
      } catch (e) {
        console.log(e)
      }
    }
    getCartItem();
    },[])
    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal Items" value={total} />
          <OrderSummaryItem label="Delivery Charges" value={total} />
          <OrderSummaryItem label="Coupon Code">
            <Link href="#">
              Add coupon code
            </Link>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {items.total}
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Checkout
        </Button>
      </Stack>
    )
  }