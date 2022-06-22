import { Accordion, AccordionButton, AccordionIcon, AccordionItem, Box, AccordionPanel } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Loading";
import "react-accessible-accordion/dist/fancy-example.css";

function Orders() {
    const [order, setOrder] = useState([])
    const [spinner, setSpinner] = useState(false);
    const getSearch = async () => {
        setSpinner(true)
        let token = JSON.parse(localStorage.getItem("Token"));
        try {
            const url = await axios
                .post(
                    "https://food-app-hai.herokuapp.com/api/user/placedOrder",
                    {},
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((result) => {
                    setOrder(result.data.data);
                    setSpinner(false);
                });
        } catch (e) {
            console.log(e);
            setSpinner(false)
        }
    }
    const downloading = (link) => {
        window.open(`https://food-app-hai.herokuapp.com${link}`)
    }

    useEffect(() => {
        getSearch()
    }, [])

    return (
        <> {spinner ? <Loading /> :
            order.map((items, index) => {
                return <div key={index}>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <span className="me-2">Order Id:</span> {items.orderId}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>

                                <div className="table-responsive">
                                    <table className="table table-bordered m-0">
                                        <thead>
                                            <tr>
                                                <th className="text-center py-3 px-4">
                                                    Product Details
                                                </th>
                                                <th className="text-right py-3 px-4">Price</th>
                                                <th className="text-right py-3 px-4">Delivery Status</th>
                                                <th className="text-center py-3 px-4">
                                                    Delivery Charges
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.items.map((items1, index1) => {

                                                return <tr key={index1}>
                                                    <td className="p-4">
                                                        <div className="media align-items-center">
                                                            {items1.productName}
                                                        </div>
                                                    </td>
                                                    <td className="text-right font-weight-semibold align-middle p-4">
                                                        <pre>
                                                            {items1.price} x {items1.quantity}
                                                        </pre>
                                                    </td>

                                                    <td className="align-middle p-4">{items.status}</td>
                                                    <td className="text-center align-middle px-0">
                                                        {items1.deliveryCharges}
                                                    </td>
                                                </tr>

                                            })}

                                        </tbody>
                                    </table>
                                    <div>
                                        <h1 style={{ "alignItems": "center", "textAlign": "center", "fontSize": "20px" }}><b>Total Charges : {items.total}</b></h1>
                                        <button type="button" className="btn btn-info" style={{ "marginTop": "15px", "float": "right" }} onClick={() => downloading(items.invoice)}>Download Invoice</button>
                                    </div>

                                </div>


                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            })}
        </>
    )
}

export default Orders