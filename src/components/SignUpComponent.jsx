import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import "../css/styles.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions";

const SignUpcomponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      <Container fluid>
        <div className="signup-wrapper">
          <h4 className="mt-4">Register</h4>
          <p className="mt-3 font-weight-semibold">
            Manage all your inventory efficiently
          </p>
          <p className="mt-3">
            Let’s get you all set up so you can verify your personal account and
            begin setting up your work profile
          </p>
          <SignUpForm />
          <div>
            <span>Already have an account?</span>
            <Link to={`/`} className="link-blue">
              {" "}
              Log in
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUpcomponent;
