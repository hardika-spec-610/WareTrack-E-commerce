import { useParams } from "react-router";
import HeaderCom from "./HeaderCom";
import { PayPalButton } from "react-paypal-button-v2";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { FaUserAlt, FaTruckMoving } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ORDER_PAY_RESET, getOrderDetails, payOrder } from "../redux/actions";
import { format } from "date-fns";

const OrderScreen = () => {
  const params = useParams();
  console.log("orderId", params.orderId);
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  // const cart = useSelector((state) => state.cart);
  // console.log("orderScreen", cart);
  const orderDetails = useSelector((state) => state.orderDetails);
  console.log("orderDetails", orderDetails);
  // const { order } = orderDetails;
  const order = orderDetails.orders;
  console.log("orderscreenOrder", order);
  const orderPay = useSelector((state) => state.orderPay);
  console.log("orderPay", orderPay);
  const { success: successPay } = orderPay;
  const isLoading = useSelector((state) => state.orderPay.isLoading);
  if (order) {
    // Perform your calculations
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0
      )
    );
  }

  useEffect(() => {
    // dispatch(getOrderDetails(params.orderId));
    const addPayPalScript = async () => {
      const response = await fetch("/config/paypal");
      const { clientId } = await response.json();
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(params.orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    } else {
      setSdkReady(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params.orderId, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log("paymentResult", paymentResult);
    // dispatch(payOrder(params.orderId, paymentResult.payment));
  };

  return (
    <div>
      <HeaderCom />
      <div className="navbar-space"></div>
      <Container>
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <div className="d-flex">
                  <div className="icon-block">
                    <div className="light-icon-color">
                      <FaUserAlt fill="#1366d9" size="20px" />
                    </div>
                  </div>
                  <div className="order-right-info">
                    <p className="mb-0 font-weight-bold">Customer</p>{" "}
                    <p className="mb-0">
                      {order.user?.firstName} {order.user?.lastName}
                    </p>{" "}
                    <a href={`mailto:${order.user?.email}`} className="mb-0">
                      {order.user?.email}
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <div className="d-flex">
                  <div className="icon-block">
                    <div className="light-icon-color">
                      <FaTruckMoving fill="#1366d9" size="20px" />
                    </div>
                  </div>
                  <div className="order-right-info">
                    <p className="mb-0 font-weight-bold">Order Info</p>{" "}
                    <p className="mb-0">
                      Shipping: {order.shippingAddress?.city}
                    </p>{" "}
                    <p className="mb-0">Pay method: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="bg-info">
                        <p className="text-white text-center text-sm -start">
                          Paid on {format(new Date(order.paidAt), "PPpp")}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger">
                        <p className="text-white text-center text-sm -start">
                          Not Paid
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <div className="d-flex">
                  <div className="icon-block">
                    <div className="light-icon-color">
                      <HiLocationMarker fill="#1366d9" size="20px" />
                    </div>
                  </div>
                  <div className="order-right-info">
                    <p className="mb-0 font-weight-bold">Deliver to</p>{" "}
                    <p className="mb-0">
                      Address: {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city},
                      {order.shippingAddress?.postalCode}{" "}
                      {order.shippingAddress?.country}
                    </p>{" "}
                    {order.isDelivered ? (
                      <div className="bg-info">
                        <p className="text-white text-center text-sm -start">
                          Delivered on{" "}
                          {format(new Date(order.deliveredAt), "PPpp")}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger">
                        <p className="text-white text-center text-sm -start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            {order?.orderItems.length === 0 ? (
              <div className="alert alert-info text-center mt-3">
                {" "}
                Your cart is empty
                <Link to="/dashboard">
                  <Button type="submit" className=" ml-3 blue-btn ">
                    SHOPPING NOW
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Table responsive className="mt-5">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex">
                            <div className="img-b">
                              <img
                                src={item.product?.imageUrl}
                                alt={item.product?.name}
                                className="w-100"
                              />
                            </div>
                            <div className="info-b ml-3">
                              <Link to={`/details/${item.product._id}`}>
                                <h5>{item.product?.name}</h5>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>{item.product?.price}€</td>
                        <td>{item.qty}</td>
                        <td>
                          {parseFloat(item.qty) *
                            parseFloat(item.product?.price)}
                          €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                  <div className="d-flex flex-column">
                    <span className="mr-4">Subtotal:</span>
                    <span className="mr-4">Shipping cost:</span>
                    <span className="mr-4">Tax cost:</span>
                    <span className="mr-4">Grand total:</span>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <span>{order.itemsPrice}€</span>
                    <span>{order.shippingPrice}€</span>
                    <span>{order.taxPrice}€</span>
                    <b>{order.totalPrice}€</b>
                  </div>
                </div>
                {!order.isPaid && (
                  <div className="d-flex justify-content-end mt-3">
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OrderScreen;
