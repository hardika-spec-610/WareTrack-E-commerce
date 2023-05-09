import { Button, Container, Dropdown, Form, Navbar } from "react-bootstrap";
import "../css/styles.css";
import Logo from "../assets/logo.svg";
import { BsCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const HeaderCom = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#">
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
              Hi,User
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
