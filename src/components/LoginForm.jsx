import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../css/styles.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_LOGIN } from "../redux/actions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log("email", email);
  // console.log("password", password);
  const allUsers = useSelector((state) => state.allUsers.users);
  console.log("allUsers", allUsers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("logindata", data);
        dispatch({
          type: GET_ALL_LOGIN,
          payload: data.accessToken,
        });
        localStorage.setItem("accessToken", data.accessToken);
        console.log("accessToken", data.accessToken);
        navigate("/dashboard");
      } else {
        // show some error message e.g bad credentials
        toast.error("Invalid Email or Password");
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className=" my-3 max-form">
      <div className="mb-2">
        <Form.Group className="mb-4">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            className="dark-bdr-fill"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password*</Form.Label>
          <Form.Control
            className="dark-bdr-fill"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <a href="#forgotPassword" className="link-blue">
          Forgot password?
        </a>
      </div>
      <div>
        <Button
          type="submit"
          className="mt-2 w-100 blue-btn "
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
