import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MyCart from "./pages/MyCart";
import MyProfile from "./pages/MyProfile";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import MyCoupons from "./pages/MyCoupons";
import ProductPage from "./pages/ProductPage";
import Trial from "./components/Trial";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./pages/SearchPage";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  useEffect(() => {
    setSelectedProduct(localStorage.getItem("selectedProduct"));
  }, [localStorage.getItem("selectedProduct")]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/searchresult" element={<SearchPage />} />
          <Route exact path="/cart" element={<MyCart />} />
          <Route exact path="/myprofile" element={<MyProfile />} />
          <Route exact path="/addaddress" element={<AddAddress />} />
          <Route exact path="/myorders" element={<MyOrders />} />
          <Route exact path="/mycoupons" element={<MyCoupons />} />
          <Route
            exact
            path={`/product/${selectedProduct}`}
            element={<ProductPage productId={selectedProduct}/>}
          />
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/trial" element={<Trial />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
