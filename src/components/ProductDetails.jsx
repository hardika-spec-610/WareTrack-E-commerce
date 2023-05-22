import {
  Alert,
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import HeaderCom from "./HeaderCom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productDetail } from "../redux/actions";
import { useNavigate, useParams } from "react-router";
import "../css/styles.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails.products);
  console.log("productDetails", productDetails);
  const { isLoading, isError } = productDetails;

  useEffect(() => {
    dispatch(productDetail(params.productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params.productId]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${params.productId}?qty=${qty}`);
  };

  return (
    <div>
      <HeaderCom />
      <div className="navbar-space"></div>
      <Container>
        <Row className="detail-block mb-5">
          {isLoading ? (
            <Spinner animation="grow" />
          ) : isError ? (
            <Alert variant="danger">Aww snap, we got an error!😨</Alert>
          ) : (
            <>
              <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                <div className="right-info-block">
                  <img
                    src={productDetails.imageUrl}
                    alt={productDetails.name}
                    className="product-img"
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                <div>
                  <h3>{productDetails.name}</h3>
                  <p className="mb-0">{productDetails.description}</p>
                  <ListGroup className="detail-list mt-5">
                    <ListGroup.Item>
                      {" "}
                      <span className="d-flex mb-2">
                        <span className="sub-text-color">Price</span>
                        <span className="ml-auto font-weight-bold">
                          {productDetails.price}€
                        </span>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <span className="d-flex mb-2">
                        <span className="sub-text-color">Status</span>
                        {productDetails.quantity > 0 ? (
                          <span className="ml-auto font-weight-bold">
                            In Stock
                          </span>
                        ) : (
                          <span className="ml-auto font-weight-bold">
                            Out of Stock
                          </span>
                        )}
                      </span>
                    </ListGroup.Item>
                    {productDetails.quantity > 0 ? (
                      <>
                        <ListGroup.Item>
                          {" "}
                          <span className="d-flex mb-2">
                            <span className="sub-text-color">Quantity</span>
                            <select
                              value={qty}
                              className="ml-auto qty-select"
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(productDetails.quantity).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </span>
                        </ListGroup.Item>
                        <Button
                          onClick={AddToCartHandle}
                          type="submit"
                          className="mt-4 w-75 blue-btn "
                          // onClick={handleSubmit}
                        >
                          Add to Cart
                        </Button>
                      </>
                    ) : null}
                  </ListGroup>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default ProductDetails;
