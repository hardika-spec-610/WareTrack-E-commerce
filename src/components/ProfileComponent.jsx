import { Button, Container, Table } from "react-bootstrap";
import HeaderCom from "./HeaderCom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  getMyOrderDetails,
  getOrderDetails,
  userProfile,
} from "../redux/actions";
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  console.log("profile", profile);
  const myOrders = useSelector((state) => state.myOrders.orders);
  console.log("myOrders", myOrders);

  useEffect(() => {
    dispatch(userProfile());
    dispatch(getMyOrderDetails(profile._id));
  }, [dispatch, profile._id]);

  return (
    <div>
      <HeaderCom />
      <div className="navbar-space"></div>
      <Container>
        <div className="my-5">
          <Link to="/dashboard">
            <Button type="button" className="my-4 shopping-btn ">
              Continue To Shopping
            </Button>
          </Link>
          <Table bordered hover className="mb-0 table-border-black" responsive>
            <thead>
              <tr>
                <th>Nr.</th>
                <th>ITEMS</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, index) => (
                <tr
                  key={o._id}
                  className={o.isPaid ? "green-light-bg" : "red-light-bg"}
                >
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/orders/${o._id}`}
                      className=" text-decoration-none"
                      onClick={dispatch(getOrderDetails(o._id))}
                    >
                      {o.orderItems.map((p) => (
                        <React.Fragment key={p._id}>
                          <span className="text-body">{p.product.name}</span>
                          <br /> {/* Add a line break */}
                        </React.Fragment>
                      ))}
                    </Link>
                  </td>
                  {o.isPaid ? (
                    <td>
                      <span>Paid</span>
                    </td>
                  ) : (
                    <td className="red-danger ">
                      <span>Not Paid</span>
                    </td>
                  )}

                  <td>{format(new Date(o.createdAt), "PPP")}</td>
                  <td>{o.totalPrice}€</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ProfileComponent;
