import React from "react";
import axios from "axios";
import "./registerUser.scss";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  let navigate = useNavigate();
  const onSubmit = async (data, event) => {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_ROUTE}api/user/signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data) {
          swal({
            text: "Register successfull!",
            icon: "success",
          });
          navigate("/");
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
    <div className=" d-flex justify-content-center text-start m-5">
      <form
        className="border border-3 border-secondary p-5 w-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            className="form-control border-success border-2 w-100"
            type="text"
            name="username"
            placeholder="Username"
            id="exampleInputUsername"
            {...register("username", {
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
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            className="form-control border-success border-2 w-100"
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
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control border-success border-2 w-100"
            id="exampleInputPassword1"
            placeholder="Type a password"
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
        <div className="btnR">
          <input
            className="btn btn-outline-info"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterUser;
