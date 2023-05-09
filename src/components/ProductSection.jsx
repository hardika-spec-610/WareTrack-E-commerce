import { Card, Col, Row, Spinner } from "react-bootstrap";
import "../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../redux/actions";
import { Link } from "react-router-dom";

const ProductSection = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.productList.isLoading);
  console.log("isLoading", isLoading);
  const products = useSelector((state) => state.productList.products.products);
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
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <>
          {products &&
            products
              .slice()
              .reverse()
              .map((p) => (
                <Col
                  key={p._id}
                  className=" col-12 mb-4 col-sm-12 mb-sm-4 col-md-4 mb-md-4 col-lg-4 mb-lg-4 col-xl-3 d-flex justify-content-stretch"
                >
                  <Link className="w-100 card-link" to={`/details/${p._id}`}>
                    <Card className="product-card w-100">
                      <div className="bg-color">
                        <Card.Img
                          variant="top"
                          src={p.imageUrl}
                          className="pro-img px-3 pt-3"
                        />
                      </div>
                      <Card.Title className="product-title px-3 pt-3">
                        {p.name}
                      </Card.Title>
                      <div className="mt-auto">
                        <Card.Body className="px-3 pt-0">
                          <Card.Text>
                            <span className="d-flex">
                              <span className="sub-text-color">Price</span>
                              <span className="ml-auto price-color">
                                {p.price}€
                              </span>
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
        </>
      )}
    </Row>
  );
};

export default ProductSection;
