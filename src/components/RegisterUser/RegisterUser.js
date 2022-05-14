import React from "react";

function RegisterUser() {
  return (
    <div className=" d-flex justify-content-center text-start m-5">
      <form className="border border-3 border-secondary p-5 w-50">
        <div className="mb-3">
          <label for="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control border-success border-2 w-100"
            id="exampleInputUsername"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control border-success border-2 w-100"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control border-success border-2 w-100"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterUser;
