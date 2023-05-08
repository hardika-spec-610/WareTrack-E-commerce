import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import "../css/styles.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, registerUser } from "../redux/actions";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.allUsers.users);
  console.log("allUsers", allUsers);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  console.log("user", user);

  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    const intervalId = setInterval(() => {
      setReloadPage((prevState) => !prevState);
    }, 12000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, reloadPage]);

  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("Please fill the all field");
      return;
    }
    const userExists = allUsers.find((user2) => user2.email === user.email);
    if (userExists) {
      toast.error("Email already exists");
      return;
    }
    let newUser = await dispatch(registerUser(user));
    console.log("newUser", newUser);
    toast.success("Registration successful!");
    setReloadPage((prevState) => !prevState);
    navigate("/");
  };

  return (
    <div className="register-form">
      <Form className=" my-3">
        <div className="form-content">
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>First name*</Form.Label>
                <Form.Control
                  className="dark-bdr-fill"
                  type="text"
                  placeholder="First name"
                  required
                  value={user.firstName}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      firstName: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="dark-bdr-fill"
                  value={user.email}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                  //   onBlur={(e) => {
                  //     const email = e.target.value;
                  //     const userExists = allUsers.find(
                  //       (user) => user.email === email
                  //     );
                  //     if (userExists) {
                  //       toast.error("Email already exists");
                  //     }
                  //   }}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Last name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  required
                  className="dark-bdr-fill"
                  value={user.lastName}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      lastName: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  className="dark-bdr-fill"
                  value={user.password}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            type="submit"
            className="mt-2 w-100 blue-btn "
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default SignUpForm;
