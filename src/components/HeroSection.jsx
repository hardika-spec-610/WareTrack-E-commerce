import { Col, Container, Row } from "react-bootstrap";
import "../css/styles.css";
import LeftText from "../assets/hero-left.png";
import HeroImage from "../assets/pink coat.png";

const HeroSection = () => {
  return (
    <div className="jumbotron">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div>
              <img src={LeftText} alt="text" className="left-text-image w-50" />
              <p className="lead">
                Live for Influential and Innovative fashion!
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="text-right">
              <img
                src={HeroImage}
                alt="text"
                className="left-text-image w-100"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
