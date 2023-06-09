import { useParams } from "react-router";
import HeaderCom from "./HeaderCom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { PayPalButton } from "react-paypal-button-v2";
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
  // eslint-disable-next-line no-unused-vars
  const [sdkReady, setSdkReady] = useState(false);
  // const cart = useSelector((state) => state.cart);
  // console.log("orderScreencart", cart);
  const orderDetails = useSelector((state) => state.orderDetails.orders);
  console.log("orderDetails", orderDetails);
  const order = useSelector((state) => state.orderCreate.order);
  // console.log("orderScreen", order);
  const orderPay = useSelector((state) => state.orderPay);
  console.log("orderPay", orderPay);
  const { success: successPay } = orderPay;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const updatedCart = {
    ...orderDetails,
    itemsPrice: addDecimals(
      orderDetails.orderItems.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0
      )
    ),
    shippingPrice: addDecimals(orderDetails.itemsPrice > 100 ? 0 : 5),
  };
  updatedCart.taxPrice = addDecimals(
    Number((0.15 * updatedCart.itemsPrice).toFixed(2))
  );
  updatedCart.totalPrice = addDecimals(
    Number(updatedCart.itemsPrice) +
      Number(updatedCart.shippingPrice) +
      Number(updatedCart.taxPrice)
  );

  console.log("updatedCart", updatedCart);

  useEffect(() => {
    dispatch(getOrderDetails(params.orderId));
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
    dispatch(payOrder(paymentResult.payment, params.orderId));
    dispatch(getOrderDetails(params.orderId));
  };

  return (
    <div>
      <HeaderCom />
      <div className="navbar-space"></div>
      <Container>
        <Card className="my-4">
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
                      {updatedCart.user?.firstName} {updatedCart.user?.lastName}
                    </p>{" "}
                    <a
                      href={`mailto:${updatedCart.user?.email}`}
                      className="mb-0"
                    >
                      {updatedCart.user?.email}
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
                      Shipping: {updatedCart.shippingAddress?.city}
                    </p>{" "}
                    <p className="mb-0">
                      Pay method: {updatedCart.paymentMethod}
                    </p>
                    {orderDetails.isPaid ? (
                      <div className="bg-info">
                        <p className="text-white text-center text-sm -start">
                          Paid on{" "}
                          {format(new Date(orderDetails.paidAt), "PPpp")}
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
                      Address: {updatedCart.shippingAddress?.address},{" "}
                      {updatedCart.shippingAddress?.city},
                      {updatedCart.shippingAddress?.postalCode}{" "}
                      {updatedCart.shippingAddress?.country}
                    </p>{" "}
                    {orderDetails.isDelivered ? (
                      <div className="bg-info">
                        <p className="text-white text-center text-sm -start">
                          Delivered
                          {/* {format(new Date(orderDetails.deliveredAt), "PPpp")} */}
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
            {updatedCart?.orderItems.length === 0 ? (
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
                    {updatedCart.orderItems.map((item, index) => (
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
                    <span>{updatedCart.itemsPrice}€</span>
                    <span>{updatedCart.shippingPrice}€</span>
                    <span>{updatedCart.taxPrice}€</span>
                    <b>{updatedCart.totalPrice}€</b>
                  </div>
                </div>
                {!orderDetails.isPaid && (
                  <div className="d-flex justify-content-end mt-3">
                    <PayPalScriptProvider>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          // Create and return the order details
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: orderDetails.totalPrice,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={successPaymentHandler}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
        {orderDetails.isPaid ? (
          <Link to="/dashboard">
            <Button type="button" className="my-4 shopping-btn ">
              Continue To Shopping
            </Button>
          </Link>
        ) : null}
        {/* <Card className="my-4">
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
                      {orderDetails.user?.firstName}{" "}
                      {orderDetails.user?.lastName}
                    </p>{" "}
                    <a
                      href={`mailto:${orderDetails.user?.email}`}
                      className="mb-0"
                    >
                      {orderDetails.user?.email}
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
                      Shipping: {orderDetails.shippingAddress?.city}
                    </p>{" "}
                    <p className="mb-0">Pay method: {order.paymentMethod}</p>
                    {orderDetails.isPaid ? (
                      <div className="bg-info">
                        <p className="text-white text-center text-sm -start">
                          Paid on{" "}
                          {format(new Date(orderDetails.paidAt), "PPpp")}
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
                      Address: {orderDetails.shippingAddress?.address},{" "}
                      {orderDetails.shippingAddress?.city},
                      {orderDetails.shippingAddress?.postalCode}{" "}
                      {orderDetails.shippingAddress?.country}
                    </p>{" "}
                    {orderDetails.isDelivered ? (
                      <div className="bg-info">
                        <p className="text-white text-center text-sm -start">
                          Delivered on{" "}
                          {format(new Date(orderDetails.deliveredAt), "PPpp")}
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
            {orderDetails?.orderItems.length === 0 ? (
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
                    {orderDetails.orderItems.map((item, index) => (
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
                {!orderDetails.isPaid && (
                  <div className="d-flex justify-content-end mt-3">
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
        {orderDetails.isPaid ? (
          <Link to="/dashboard">
            <Button type="button" className="my-4 shopping-btn ">
              Continue To Shopping
            </Button>
          </Link>
        ) : null} */}
      </Container>
    </div>
  );
};

export default OrderScreen;
