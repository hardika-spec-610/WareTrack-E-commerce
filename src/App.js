import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginComponent from "./components/LoginComponent";
import SignUpcomponent from "./components/SignUpComponent";
import ProductDetails from "./components/ProductDetails";
import CartScreen from "./components/CartScreen";
import ShippingScreen from "./components/ShippingScreen";
import PaymentScreen from "./components/PaymentScreen";
import PlaceOrderScreen from "./components/PlaceOrderScreen";
import OrderScreen from "./components/OrderScreen";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <Router>
          <Routes>
            <Route element={<LoginComponent />} path="/" />
            <Route element={<SignUpcomponent />} path="/signup" />
            <Route element={<Home />} path="/dashboard" />
            <Route element={<ProductDetails />} path="/details/:productId" />
            <Route element={<CartScreen />} path="/cart/:productId?" />
            <Route element={<ShippingScreen />} path="/shipping" />
            <Route element={<PaymentScreen />} path="/payment" />
            <Route element={<PlaceOrderScreen />} path="/placeorder" />
            <Route element={<OrderScreen />} path="/orders/:orderId" />
          </Routes>
        </Router>
      </header>
    </div>
  );
};

export default App;
