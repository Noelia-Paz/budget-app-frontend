import React from "react";
import "./insertRegistration.scss";

function InsertRegistration() {
  return (
    <div className=" p-4 d-flex align-items-center flex-column">
      <h1 class="fs-4 p-4">Insert a new Registration!</h1>
      <form className="border border-3 border-secondary  p-4 w-25 ">
        <div className="mb-3">
          <label for="formGroupExampleInput " className="form-label ">
            Concept
          </label>
          <input
            type="text"
            className="form-control border-info border-2"
            id="formGroupExampleInput"
            placeholder="Example Buy Vegetables "
          />
        </div>
        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Amount $
          </label>
          <input
            type="text"
            className="form-control border-info border-2"
            id="formGroupExampleInput2"
            placeholder="Example 300"
          />
        </div>
        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Type
          </label>
          <select
            className="form-select border-info border-2"
            aria-label="Default select example"
          >
            <option selected>Select the type</option>
            <option value="1">Income</option>
            <option value="2">Outcome</option>
          </select>
        </div>

        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Category
          </label>
          <select
            className="form-select border-info border-2"
            aria-label="Default select example"
          >
            <option selected>Select the expense Category</option>
            <option value="1">Food</option>
            <option value="2">Services</option>
            <option value="3">Rent</option>
            <option value="3">Others</option>
          </select>
        </div>
        <div className="buttonIsertar d-flex align-items-center flex-column">
          <button type="submit" className="btn btn-info w-100 ">
            Insert
          </button>
        </div>
      </form>
    </div>
  );
}

export default InsertRegistration;
