import { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import ProductSection from "./ProductSection";
import HeaderCom from "./HeaderCom";
import { Container } from "react-bootstrap";
import HeroSection from "./HeroSection";

const Home = () => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <HeaderCom />
      <HeroSection />
      <Container>
        <h4 className="pro-title">NEW ARRIVALS</h4>
        <ProductSection />
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
