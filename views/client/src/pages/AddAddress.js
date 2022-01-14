import React from "react";

function AddAddress() {
  return (
    <div className="page-container">
      <div className="add-address-holder">
        <div
          className="add-address-holder-item"
          id="add-address-holder-item-left"
        >
          <p id="address-type-heading">Address Type :</p>
          <input autocomplete="abcdef" type="title" id="address-type-input" />
        </div>
        <div className="add-address-holder-item">
          <input
            type="text"
            placeholder="Name"
            className="input-line-1-4"
          ></input>
          <input
            type="number"
            placeholder="Mobile No."
            className="input-line-1-4"
          ></input>
          <input
            type="email"
            placeholder="Email"
            className="input-line-1-4"
          ></input>
        </div>
        <div className="add-address-holder-item">
          <input
            type="address"
            placeholder="Flat no., Building name, Street"
            className="input-line-2-3"
          />
        </div>
        <div className="add-address-holder-item">
          <input
            type="address"
            placeholder="Locality, Area, town /taluka /village"
            className="input-line-2-3"
          />
        </div>
        <div className="add-address-holder-item">
          <input
            type="text"
            placeholder="City"
            className="input-line-1-4"
          ></input>
          <input
            type="text"
            placeholder="District"
            className="input-line-1-4"
          ></input>
          <input
            type="text"
            placeholder="State"
            className="input-line-1-4"
          ></input>
        </div>
      </div>
      <div id="add-address">
        <button>Add</button>
      </div>
    </div>
  );
}

export default AddAddress;
