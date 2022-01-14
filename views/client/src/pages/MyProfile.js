import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileDetails from "../components/ProfileDetails";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { loadUser } from "../redux/actions/authActions.js";
import { useDispatch } from "react-redux";

function MyProfile() {
  const [disabled, setDisabled] = useState(false);
  // const auth = useSelector(state => state.auth)

  // const token = auth.token

  const toggleVisibility = () => {
    if (disabled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const dispatch = useDispatch(null);
  useEffect(() => {
    dispatch(loadUser())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="page-heading">
          <p>My Profile</p>
          <hr />
        </div>
        <div className="profile-holder">
          <p onClick={toggleVisibility} className="profile-holder-header">
            Home{" "}
            {disabled ? (
              <RiArrowDownSLine id="arrow-icon" />
            ) : (
              <RiArrowUpSLine />
            )}
          </p>
          <div className={`${disabled ? "disabled" : "profile-holder-list"}`}>
            <div className="profile-holder-item">
              <p id="profile-item-title">Username : </p>
              <div>
                <ProfileDetails content="Tanmay Mutalik" />
              </div>
            </div>
            <div className="profile-holder-item">
              <p id="profile-item-title">Email : </p>
              <div>
                <ProfileDetails content="tanmaymutalik02@gmail.com" />
              </div>
            </div>
            <div className="profile-holder-item">
              <p id="profile-item-title">Mobile : </p>
              <div>
                <ProfileDetails content="9167136030" />
              </div>
            </div>
            <div className="profile-holder-item">
              <p id="profile-item-title">Address : </p>
              <div>
                <ProfileDetails
                  content={
                    "A3/105, Suryamukhi bldg, LokSurabhi, Near  Patri Pool, Kalyan (W), Thane, Maharashtra. 421301 "
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-address-button">
          <Link to="/addaddress">
            <button>Add Address</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
