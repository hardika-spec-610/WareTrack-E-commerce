import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import ProductSection from "./ProductSection";
import HeaderCom from "./HeaderCom";
import { Container } from "react-bootstrap";
import HeroSection from "./HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/actions";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  console.log("profileNav", profile);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      window.location.href = "/";
      // Reload the page
      // window.location.reload();
    }
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname !== "/" && !localStorage.getItem("accessToken")) {
      // Redirect to login page if the user is not authenticated
      window.location.href = "/";
    }
  }, [location.pathname]);
  return (
    <div>
      <HeaderCom />
      <HeroSection />
      <Container>
        <h4 className="pro-title">NEW ARRIVALS</h4>
        <ProductSection />
        <PaginationControl
          page={page}
          between={3}
          total={50}
          limit={10}
          changePage={(page) => {
            setPage(page);
            console.log(page);
          }}
          ellipsis={1}
        />
      </Container>
    </div>
  );
};
export default Home;
