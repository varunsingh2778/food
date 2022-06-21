// Sample card from Airbnb
import { Badge, Box, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";


function Product() {
  const [data, setData] = useState([]);
  const[pageArr,setPageArr] = useState([]);
  const[page,setPage] = useState(0);

//  let page = 0;

  const [removeCart, handleAddtoCart, clearCart, placedOrder, searchData, cartDataItems, displayCart, total,input] = useOutletContext();

  useEffect(() => {
    // console.log(token)
    getProd();
  },[])

  useEffect(()=>{
    pageCount();
  },[page])

  const pageCount = ()=>{
    // console.log("inside PageCount")
    // console.log(page);
    for(let i = 1;i<=page;i++){
      // console.log(i)
      setPageArr(curr=>[...curr,i])
      // console.log(i)
    }
    // return pageArr
  }

  const getProd = async (a) => {
    let token = JSON.parse(localStorage.getItem("Token"))
    try {
      let products = await axios.post("https://food-app-hai.herokuapp.com/api/user/getAllProducts", {
        limit: 3,
        page: a
      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      setData(products?.data?.data?.products)
      setPage(products?.data?.data?.pageCount)
      // console.log(products)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {input.length > 0 ?
        searchData.map((data, index) => {
          return <div key={index}>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{
              "float": "left",
              "width": "25%",
              "padding": "10px",
              "marginLeft": "70px"

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
                  {data.description}
                </Box>
                <Box>
                  ₹ {data.price}
                </Box>

                <Box display='flex' mt='2' alignItems='center' style={{ "alignItems": "center", "textAlign": "center" }}>
                  <button type="button" className="btn btn-light" onClick={() => handleAddtoCart(data._id)}>Add to Cart</button>
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
              "padding": "10px",
              "marginLeft": "70px"
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
                  {data.description}
                </Box>
                <Box>
                  ₹ {data.price}
                </Box>

                <Box display='flex' mt='2' alignItems='center' style={{ "alignItems": "center", "textAlign": "center" }}>
                  <button type="button" className="btn btn-light" onClick={() => handleAddtoCart(data._id)}>Add to Cart</button>
                </Box>
              </Box>
            </Box>
          </div>

        })}
      <div className="container d-flex justify-content-center" style={{ "paddingBottom": "2%", "paddingTop": "3%" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>

              </a>
            </li>
            {pageArr.map((item,index)=>{
              return <li key={index} className="page-item" style={{"cursor":"pointer"}}><a className="page-link" onClick={()=>getProd(item)}>{item}</a></li>
            })}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>

              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
export default Product;