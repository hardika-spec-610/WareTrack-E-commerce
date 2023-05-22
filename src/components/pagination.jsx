import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/styles.css";

const Pagination = () => {
  return (
    <ListGroup>
      <ListGroup.Item className="page-item active">
        <Link to="#">1</Link>
      </ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
};
export default Pagination;
