import React from "react";
import "./main.scss";
import img1 from "../../Images/img1.png";
import { useNavigate } from "react-router-dom";

function Main() {
  let navigate = useNavigate();
  return (
    <div className="main_container d-flex justify-content-around p-3">
      <div className=" p-3 text-start m-5 border border-3 border-secondary w-25">
        <h1>Register to start using it!</h1>
        <form className="border border-3 border-secondary p-5 bg-dark  ">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              className="form-control border-white border-2 w-100"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label text-white"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control border-white border-2 w-100"
              id="exampleInputPassword1"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-outline-warning">Login</button>
            <h2>Don't have an account? Sign up!</h2>
            <button
              onClick={() => {
                navigate("/registerUser");
              }}
              class="btn btn-outline-info"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div>
        <p>
          Keep your personal or family economy perfectly under control with the
          Expense Manager.
          <br />
          You can review your daily expenses and try to improve your savings.
        </p>
        <img src={img1} alt="" />
      </div>
    </div>
  );
}

export default Main;
