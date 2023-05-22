import { Button, Container, Dropdown, Form, Navbar } from "react-bootstrap";
import "../css/styles.css";
import Logo from "../assets/logo.svg";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout, userProfile } from "../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderCom = () => {
  const cart = useSelector((state) => state.cart);
  // console.log("headerCart", cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.user);
  // const orderDetails = useSelector((state) => state.orderDetails.orders);
  // console.log("headerorderDetails", orderDetails);
  // console.log("profileNav", profile);

  const profileHandler = () => {
    navigate("/profile");
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const { cartItems } = cart;
  // console.log(cartItems);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img src={Logo} alt="Shop logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for product"
              className="search-input"
              aria-label="Search"
            />
            <Button variant="outline-success" className="search-btn">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="user-wrapper"
            >
              Hi, {profile?.firstName}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item onClick={profileHandler}>Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-1" onClick={logoutHandler}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="cart-block position-relative">
            <div className="number-round">{cartItems.length}</div>
            <BsCartFill
              size="28px"
              color="#ebd96b"
              className="ml-2 cart-wrap"
            />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
export default HeaderCom;
