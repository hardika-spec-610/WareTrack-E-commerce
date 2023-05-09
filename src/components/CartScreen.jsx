import { Button, Col, Container, Row } from "react-bootstrap";
import HeaderCom from "./HeaderCom";
import "../css/styles.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

const CartScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //   console.log(qty);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (params.productId) {
      dispatch(addToCart(params.productId, qty));
    }
  }, [dispatch, params.productId, qty]);

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const checkOutHandler = () => {};
  const removeFromCartHandle = (_id) => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div className="height-100">
      <HeaderCom />
      <div className="navbar-space"></div>

      <Container>
        {cartItems.length === 0 ? (
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
            <div className="cart-wrapper">
              <div className="upper-purple-block">
                <p className="text-center mb-0">
                  Total Cart Products({cartItems.length})
                </p>
              </div>
              {cartItems.map((item) => (
                <>
                  <div
                    key={item.product}
                    className="mt-3 border-bottom position-relative"
                  >
                    <div
                      className="remove-button "
                      onClick={() => removeFromCartHandle(item.product)}
                    >
                      <AiFillCloseCircle size={24} fill="#ff0000" />
                    </div>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className="px-3">
                          <Row className="align-items-center">
                            <Col md={6}>
                              <div>
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-75"
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <Link to={`/details/${item.product}`}>
                                <h5>{item.name}</h5>
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className="h-100 px-3">
                          <Row className="align-items-center h-100">
                            <Col md={3}>
                              <div className="text-center">
                                <p>Quantity</p>
                                <select
                                  value={item.qty}
                                  className="ml-auto qty-select"
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[...Array(item.quantity).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col md={2}>
                              <div className="text-center">
                                <p>x</p>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <p>price</p>
                                <p>{item.price}€</p>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="text-center">
                                <p>Subtotal</p>
                                <p>
                                  {parseFloat(item.qty) *
                                    parseFloat(item.price)}
                                  €
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              ))}
              <p className="text-right font-weight-bold mt-3 mr-4">
                Total:{" "}
                <span className="total-amount ml-2">{total.toFixed(2)}€</span>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <Link to="/dashboard">
                <Button type="button" className="mt-4 shopping-btn ">
                  Continue To Shopping
                </Button>
              </Link>
              {total > 0 && (
                <Link>
                  <Button
                    type="button"
                    className="mt-4 blue-btn"
                    onClick={checkOutHandler}
                  >
                    Checkout
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default CartScreen;
