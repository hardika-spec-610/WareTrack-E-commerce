import React, { useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import googleIcon from "../assets/google-icon.svg";
import "../css/styles.css";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions";

const LoginComponent = () => {
  const dispatch = useDispatch();
  // const allUsers = useSelector((state) => state.allUsers.users);
  // console.log("allUsers", allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      <Container fluid>
        <div className="login-block">
          <h4 className="mt-4">Login</h4>
          <p className="mt-3">see your growth and get support!</p>
          <a
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={`${process.env.REACT_APP_BE_URL}/users/auth/google`}
          >
            <span>Sign in with google</span>{" "}
            <Image src={googleIcon} alt="google logo" />
          </a>
          <LoginForm />
          <div>
            <span>Not regestered yet?</span>
            <Link to={`/signup`} className="link-blue">
              {" "}
              Create a new account
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginComponent;
