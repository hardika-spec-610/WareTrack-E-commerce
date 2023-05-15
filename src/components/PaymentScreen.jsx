import { Button, Container, Form } from "react-bootstrap";
import HeaderCom from "./HeaderCom";
import "../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { savePaymentMethod } from "../redux/actions";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(e);
    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };
  return (
    <div>
      <HeaderCom />
      <Container className="d-flex flex-column justify-content-center align-items-center height-100">
        <Form className="payment-block" onSubmit={submitHandler}>
          <h4 className="mb-0">Select Payment method</h4>
          <Form.Group>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              className="my-4"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
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

export default PaymentScreen;
