import React from "react";
import "./main.scss";
import img1 from "../../Images/img1.png";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import axios from "axios";

function Main(props) {
  const { setIsAuthenticated } = props;
  let navigate = useNavigate();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_ROUTE}api/user/signin`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.auth) {
          localStorage.setItem(
            "isAuthenticated",
            JSON.stringify(res.data.auth)
          );
          localStorage.setItem("userId", JSON.stringify(res.data.userId));
          setIsAuthenticated(true);
          navigate("/home");
          swal({
            text: "Login successfull!",
            icon: "success",
          });
        } else {
          swal({
            text: res.data.message,
            icon: "error",
          });
        }
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="main_container ">
      <div className="main text-start border border-3 border-secondary ">
        <h1 className="textLogin">Register to start using it!</h1>
        <form
          className="formLogin border border-3 border-secondary  bg-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Email address
            </label>
            <input
              className="form-control border-white border-2 w-100"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("email", {
                required: {
                  value: true,
                  message: "The field cannot be empty",
                },
                pattern: {
                  value:
                    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                  message: "The format is not correct",
                },
              })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-white"
            >
              Password
            </label>
            <input
              className="form-control border-white border-2 w-100"
              type="password"
              name="password"
              placeholder="Type a password"
              id="exampleInputPassword1"
              {...register("password", {
                required: {
                  value: true,
                  message: "The field is required",
                },
                minLength: {
                  value: 4,
                  message: "Write at least 4 characters",
                },
              })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          <button className="buttonLogin btn btn-outline-warning" type="submit">
            Login
          </button>
        </form>
        <div className="cont-button">
          <h2 className="textS">Don't have an account? Sign up!</h2>
          <button
            onClick={() => {
              navigate("/registerUser");
            }}
            className="buttonR btn btn-outline-info "
          >
            Register
          </button>
        </div>
      </div>
      <div className="imgText">
        <p className="textend">
          Keep your personal or family economy perfectly under control with the
          Expense Manager.
          <br />
          You can review your daily expenses and try to improve your savings.
        </p>
        <img src={img1} alt="" className="image" />
      </div>
    </div>
  );
}

export default Main;
