import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <Router>
          <Routes>
            <Route element={<LoginComponent />} path="/" />
            {/* <Route element={<SignUpcomponent />} path="/signup" /> */}
            <Route element={<Home />} path="/dashboard" />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
