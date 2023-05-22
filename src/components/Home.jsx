import { useEffect } from "react";
import ProductSection from "./ProductSection";
import HeaderCom from "./HeaderCom";
import { Container } from "react-bootstrap";
import HeroSection from "./HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, userProfile } from "../redux/actions";
import { useLocation } from "react-router-dom";
import "../css/styles.css";
// import PaginationControl from "./PaginationControl";

const Home = () => {
  // const [page, setPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  console.log("profileNav", profile);
  const products = useSelector((state) => state.productList.products);
  console.log("products", products);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/";
      // Alternatively, you can use a routing library to navigate within a single-page application (SPA)
      // history.push('/');
    } else {
      dispatch(userProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname !== "/" && !localStorage.getItem("accessToken")) {
      // Redirect to login page if the user is not authenticated
      window.location.href = "/";
    }
    dispatch(getAllProducts());
  }, [dispatch, location.pathname]);

  return (
    <div>
      <HeaderCom />
      <HeroSection />
      <Container>
        <h4 className="pro-title">NEW ARRIVALS</h4>
        <ProductSection />
      </Container>
      <footer className="footer-bg mt-5 py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Made with ❣️ by Hardika Moradiya</p>
            <p className="mb-0">Copyright ©2023 All rights reserved </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};
export default Home;
