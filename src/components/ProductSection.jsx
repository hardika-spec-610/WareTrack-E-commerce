import { Card, Col, Row } from "react-bootstrap";
import image1 from "../assets/meza1.png";
import "../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../redux/actions";

const ProductSection = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList.products);
  console.log("products", products);

  useEffect(() => {
    // if (!localStorage.getItem("accessToken")) {
    //   window.location.href = "/";
    //   // Reload the page
    //   // window.location.reload();
    // }
    dispatch(getAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Row className="pro-sec-padding">
      <Col className=" col-12 mb-4 col-sm-12 mb-sm-4 col-md-4 mb-md-4 col-lg-4 mb-lg-4 col-xl-3 d-flex justify-content-stretch">
        <Card className="product-card w-100">
          <div className="bg-color">
            <Card.Img
              variant="top"
              src={image1}
              className="pro-img px-3 pt-3"
            />
          </div>
          <Card.Title className="product-title px-3 pt-3">Table</Card.Title>
          <div className="mt-auto">
            <Card.Body className="px-3 pt-0">
              <Card.Text>
                <span className="d-flex">
                  <span className="sub-text-color">Price</span>
                  <span className="ml-auto price-color">50€</span>
                </span>
              </Card.Text>
            </Card.Body>
          </div>
        </Card>
      </Col>
      <Col className=" col-12 mb-4 col-sm-12 mb-sm-4 col-md-4 mb-md-4 col-lg-4 mb-lg-4 col-xl-3 d-flex justify-content-stretch">
        <Card className="product-card w-100">
          <div className="bg-color">
            <Card.Img
              variant="top"
              src={image1}
              className="pro-img px-3 pt-3"
            />
          </div>
          <Card.Title className="product-title px-3 pt-3">Table</Card.Title>
          <div className="mt-auto">
            <Card.Body className="px-3 pt-0">
              <Card.Text>
                <span className="d-flex">
                  <span className="sub-text-color">Price</span>
                  <span className="ml-auto price-color">50€</span>
                </span>
              </Card.Text>
            </Card.Body>
          </div>
        </Card>
      </Col>
      <Col className=" col-12 mb-4 col-sm-12 mb-sm-4 col-md-4 mb-md-4 col-lg-4 mb-lg-4 col-xl-3 d-flex justify-content-stretch">
        <Card className="product-card w-100">
          <div className="bg-color">
            <Card.Img
              variant="top"
              src={image1}
              className="pro-img px-3 pt-3"
            />
          </div>
          <Card.Title className="product-title px-3 pt-3">Table</Card.Title>
          <div className="mt-auto">
            <Card.Body className="px-3 pt-0">
              <Card.Text>
                <span className="d-flex">
                  <span className="sub-text-color">Price</span>
                  <span className="ml-auto price-color">50€</span>
                </span>
              </Card.Text>
            </Card.Body>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductSection;
