// Sample card from Airbnb

import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Product() {
  const [data, setData] = useState([]);
  const[filtered] = useOutletContext();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("Token"))
    const getProd = async () => {
      try {
        let products = await axios.post("https://food-app-hai.herokuapp.com/api/user/getAllProducts", {}, {
          headers: {
            Authorization: 'Bearer ' + token  
          }
        })
        setData(products?.data?.data?.products)
        // console.log(products)
      } catch (e) {
        console.log(e)
      }
    }
    getProd();
  }, [])


  return (
    <>{filtered.length>0?
    filtered.map((data, index) => {
        return <div key={index}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{d
            "float": "left",
            "width": "25%",
            "padding": "10px"
          }}>
            <Image src={data.image} alt="" />

            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  New
                </Badge>
              </Box>

              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                {data.productName}
              </Box>

              <Box>
                {data.price}
              </Box>

              <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < data.ratings ? 'teal.500' : 'gray.300'}
                    />
                  ))}
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                  100 reviews
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      })
    :
    data.map((data, index) => {
        return <div key={index}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{
            "float": "left",
            "width": "25%",
            "padding": "10px"
          }}>
            <Image src={data.image} alt="" />

            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  New
                </Badge>
              </Box>

              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                {data.productName}
              </Box>

              <Box>
                {data.price}
              </Box>

              <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < data.ratings ? 'teal.500' : 'gray.300'}
                    />
                  ))}
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                  100 reviews
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      })}
      
    </>
  )
}
export default Product;