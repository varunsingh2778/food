import { Badge, Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { config } from "../../../Axiosconfig";
import Loading from "../../../Loading";
import '../Product/Product.css'

function Product() {
  const [data, setData] = useState([]);
  const [pageArr, setPageArr] = useState([]);
  const [page, setPage] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const [removeCart, handleAddtoCart, clearCart, placedOrder, searchData, cartDataItems, displayCart, total, input] = useOutletContext();

  useEffect(() => {
    getProd();
  }, [])

  useEffect(() => {
    pageCount();
  }, [page])

  const pageCount = () => {
    for (let i = 1; i <= page; i++) {
      setPageArr(curr => [...curr, i])
    }
  }

  const getProd = async (a) => {
    setSpinner(true);
    try {
      let products = await config().post(`/user/getAllProducts`, {
        limit: 3,
        page: a
      })
      setData(products?.data?.data?.products)
      setPage(products?.data?.data?.pageCount)
      setSpinner(false)
    } catch (e) {
      console.log(e)
      setSpinner(false)
    }
  }

  return (
    <>{spinner ? <Loading /> :
      input.length > 0 ?
        searchData.map((data, index) => {
          return <div key={index}>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' className="prodBox">
              <Image src={data.image} alt="" className="prodImg"/>

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

                <Box display='flex' mt='2' alignItems='center' className="prodbtn">
                  <button type="button" className="btn btn-light" onClick={() => handleAddtoCart(data._id)}>Add to Cart</button>
                </Box>
              </Box>
            </Box>
          </div>
        })
        :
        data.map((data, index) => {
          return <div key={index}>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' className="prodBox">
              <Image src={data.image} alt="" className="prodImg" />

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

                <Box display='flex' mt='2' alignItems='center' className="prodbtn">
                  <button type="button" className="btn btn-light" onClick={() => handleAddtoCart(data._id)}>Add to Cart</button>
                </Box>
              </Box>
            </Box>
          </div>

        })}
      <div className="container d-flex justify-content-center" id="prodPagination">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>

              </a>
            </li>
            {pageArr.map((item, index) => {
              return <li key={index} className="page-item" id="pageLi"><a className="page-link" onClick={() => getProd(item)}>{item}</a></li>
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