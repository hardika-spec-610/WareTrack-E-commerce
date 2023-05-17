import HeaderCom from "./HeaderCom";
import "../css/styles.css";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions";
import { useNavigate } from "react-router";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log("shippingCart", cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div>
      <HeaderCom />
      <Container className="d-flex flex-column justify-content-center align-items-center height-100">
        <h4 className="mt-4">DELIVERY ADDRESS</h4>
        <Form className="max-shipping-form" onSubmit={submitHandler}>
          <div className="mb-2">
            <Form.Group className="mb-4">
              <Form.Control
                className="dark-bdr-fill"
                type="text"
                required
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                className="dark-bdr-fill"
                type="text"
                required
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                className="dark-bdr-fill"
                type="text"
                required
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="dark-bdr-fill"
                type="text"
                required
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
          </div>
          <div>
            <Button
              type="submit"
              className="mt-2 w-100 blue-btn "
              // onClick={handleSubmit}
            >
              CONTINUE
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ShippingScreen;
