import React, { useState } from "react";
import logo from "../images/shop_e_stop_logo_2.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions.js";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: 0,
    password: "",
    isSeller: false,
  });
  const [primaryAddress, setPrimaryAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    district: "",
    state: "",
  });

  const dispatch = useDispatch(null);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData, primaryAddress)).then(() => {
      // navigate("/login");
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 3);
    });
  };

  const onChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onAddChange = (e) => {
    console.log(primaryAddress);
    setPrimaryAddress({ ...primaryAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <div className="form-container-signup">
        <form method="POST"
          onSubmit={(e) => onSubmit(e)}
        >
          <img src={logo} alt="Logo" className="form-logo" />
          <div className="form-body">
            <div className="form-body-left">
              <input
                type="text"
                autoComplete="abcdef"
                name="name"
                required
                placeholder="Enter your name"
                onChange={(e) => onChange(e)}
              />
              <input
                type="email"
                name="email"
                required
                autoComplete="abcdef"
                placeholder="Enter your email address"
                onChange={(e) => onChange(e)}
              />
              <input
                type="number"
                name="mobile"
                required
                autoComplete="abcdef"
                placeholder="Enter your mobile number"
                onChange={(e) => onChange(e)}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-body-right">
              <div className="signup-address-holder">
                <div className="signup-address-holder-input">
                  <input
                    type="address"
                    name="line1"
                    placeholder="Flat no., Building name, Street"
                    onChange={(e) => onAddChange(e)}
                  />
                </div>
                <div className="signup-address-holder-input">
                  <input
                    type="address"
                    name="line2"
                    placeholder="Locality, Area, town /taluka /village"
                    onChange={(e) => onAddChange(e)}
                  />
                </div>
                <div className="signup-address-holder-input">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={(e) => onAddChange(e)}
                  />
                  <input
                    type="text"
                    name="district"
                    className="signup-address-holder-input-2"
                    placeholder="District"
                    onChange={(e) => onAddChange(e)}
                  ></input>
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={(e) => onAddChange(e)}
                  />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                  <input
                    type="checkbox"
                    name="isSeller"
                    onChange={(e) =>
                      setFormData({ ...formData, isSeller: e.target.checked })
                    }
                    style={{ marginTop: "5px", marginRight: "5px" }}
                  />
                  <p>Are you a seller ?</p>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            // type="button"
            value="SIGNUP"
            id="signup-button"
            className="signup-button-class"
            // onCLick = {onSubmit}
          />
          <Link to="/login" className="create-account-button-link">
            <p className="create-account-button">Already Registered? Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
