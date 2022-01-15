import React, { useState, useEffect } from "react";
import logo from "../images/shop_e_stop_logo.png";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Category from "./Category";
import { useDispatch } from "react-redux";
import { loadUser, logout } from "../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let state;
  const [menuEnabled, setMenuEnabled] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    if (menuEnabled) {
      setMenuEnabled(false);
    } else {
      setMenuEnabled(true);
    }
  };
  const disableMenu = () => {
    if (menuEnabled) {
      setMenuEnabled(false);
    }
  };
  const dispatch = useDispatch(null);
  // let user = undefined;
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    dispatch(loadUser())
      .then((result) => {
        state = JSON.parse(localStorage.getItem("state"));
        setUser(state.auth.userDetail);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  console.log("USER=>", user);

  const logoutBtn = () => {
    // useEffect(() => {
    dispatch(logout())
      .then((result) => {
        // console.log(result);
        // navigate("/");
        setTimeout(() => {
          window.location.reload(false);
          navigate("/");
        }, 3);
      })
      .catch((err) => {
        console.log(err);
      });
    // }, []);
  };

  const [categoryVisible, setCategoryVisible] = useState(false);
  const toggleCategory = () => {
    if (categoryVisible) {
      setCategoryVisible(false);
    } else {
      setCategoryVisible(true);
    }
  };
  const disableCategory = () => {
    setCategoryVisible(false);
  };
  return (
    <div>
      <div className="navbar">
        <Link to="/" onClick={disableMenu}>
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
        <ul className="navbar-ul">
          {/* <li>
            <BiCategory className="category" onClick={toggleCategory}/>
          </li> */}

          <li>
            <Link to="/cart" onClick={disableMenu}>
              <GiShoppingCart className="cart" />
            </Link>
          </li>
          <li>
            {user && user.name ? (
              <Link to="#" onClick={logoutBtn}>
                <FiLogOut className="cart" />
              </Link>
            ) : (
              <Link to="/login" onClick={disableMenu}>
                <FiLogIn className="cart" />
              </Link>
            )}
          </li>
          <li>
            <AiOutlineUser onClick={toggleMenu} className="user" />
          </li>
        </ul>

        {/* <div className="navbar-search">
          <form>
            <IoIosSearch className="navbar-search-logo" type="submit" />
            <input
              className="navbar-searchbar"
              placeholder="Search for products....."
            />
          </form>
        </div> */}
        <div
          className={`navbar-profile-menu-${
            menuEnabled ? "enabled" : "disabled"
          }`}
        >
          {user && user.name ? (
            <OutsideClickHandler onOutsideClick={disableMenu}>
              <ul>
                <li>
                  <div className="navbar-profile-menu-header">
                    <div>
                      <ul>
                        <li id="username">
                          {user.name && user.name.split(" ")[0]}
                        </li>
                        <li id="useremail">{user.email}</li>
                      </ul>
                    </div>
                    <div>
                      <AiOutlineUser
                        onClick={toggleMenu}
                        id="menu_user"
                        className="user"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  {/* <Link to="myprofile" onClick={disableMenu}>
                  <div className="navbar-profile-menu-item">
                    <p>My Profile</p>
                  </div>
                </Link> */}
                  {/* <Link to="myorders" onClick={disableMenu}>
                  <div className="navbar-profile-menu-item">
                    <p>My Orders</p>
                  </div>
                </Link>
                <Link to="mycoupons" onClick={disableMenu}>
                  <div className="navbar-profile-menu-item">
                    <p>My Coupons</p>
                  </div>
                </Link> */}
                  <Link to="#" onClick={logoutBtn}>
                    <div className="navbar-profile-menu-item">
                      <p>Logout</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </OutsideClickHandler>
          ) : (
            <OutsideClickHandler onOutsideClick={disableMenu}>
              <ul>
                <li>
                  <div className="navbar-profile-menu-header">
                    <div>
                      <ul>
                        <li id="username">No User</li>
                        <li id="useremail">Please, Log in to proceed</li>
                      </ul>
                    </div>
                    <div>
                      <AiOutlineUser
                        onClick={toggleMenu}
                        id="menu_user"
                        className="user"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/login" onClick={disableMenu}>
                    <div className="navbar-profile-menu-item">
                      <p>Login</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </OutsideClickHandler>
          )}
        </div>
      </div>
      {categoryVisible ? <Category /> : <></>}
    </div>
  );
}

export default Navbar;
