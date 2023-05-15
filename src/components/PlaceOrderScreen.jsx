import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import HeaderCom from "./HeaderCom";
import { FaUserAlt, FaTruckMoving } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ORDER_CREATE_RESET, createOrder } from "../redux/actions";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);
  const profile = useSelector((state) => state.profile.user);
  console.log("profileNav", profile);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const updatedCart = {
    ...cart,
    itemsPrice: addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice: addDecimals(cart.itemsPrice > 100 ? 0 : 5),
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
  // const addDecimals = (num) => {
  //   return (Math.round(num * 100) / 100).toFixed(2);
  // };

  // cart.itemsPrice = addDecimals(
  //   cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // );

  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 5);
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  // cart.totalPrice = (
  //   Number(cart.itemsPrice) +
  //   Number(cart.shippingPrice) +
  //   Number(cart.taxPrice)
  // ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  console.log("orderCreate", orderCreate);
  const { order, isLoading, isError, success } = orderCreate;
  console.log("orderId", order._id);

  // useEffect(() => {
  //   if (success) {
  //     navigate(`/orders/${order._id}`);
  //     // dispatch({ type: ORDER_CREATE_RESET });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        user: profile._id,
        orderItems: updatedCart.cartItems,
        shippingAddress: updatedCart.shippingAddress,
        paymentMethod: updatedCart.paymentMethod,
        itemsPrice: updatedCart.itemsPrice,
        shippingPrice: updatedCart.shippingPrice,
        taxPrice: updatedCart.taxPrice,
        totalPrice: updatedCart.totalPrice,
      })
    );
    navigate(`/orders/${order._id}`);
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
                      {profile.firstName} {profile.lastName}
                    </p>{" "}
                    <a href={`mailto:${profile.email}`} className="mb-0">
                      {profile.email}
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
                      Shipping: {cart.shippingAddress?.city}
                    </p>{" "}
                    <p className="mb-0">Pay method: {cart.paymentMethod}</p>
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
                      Address: {cart.shippingAddress?.address},{" "}
                      {cart.shippingAddress?.city},
                      {cart.shippingAddress?.postalCode}{" "}
                      {cart.shippingAddress?.country}
                    </p>{" "}
                  </div>
                </div>
              </Col>
            </Row>
            {updatedCart.cartItems.length === 0 ? (
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
                    {updatedCart.cartItems.map((item, index) => (
                      <tr key={item.product}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex">
                            <div className="img-b">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-100"
                              />
                            </div>
                            <div className="info-b ml-3">
                              <Link to={`/details/${item.product}`}>
                                <h5>{item.name}</h5>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>{item.price}€</td>
                        <td>{item.qty}</td>
                        <td>
                          {parseFloat(item.qty) * parseFloat(item.price)}€
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
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    type="button"
                    className="blue-btn"
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
                {isError && (
                  <Alert variant="danger">Aww snap, we got an error!😨</Alert>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PlaceOrderScreen;
