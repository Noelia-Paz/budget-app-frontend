import React from "react";
import "./editRegistration.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

function EditRegistration() {
  let navigate = useNavigate();
  const location = useLocation();
  const registration = location.state.registration;
  const userId = JSON.parse(localStorage.getItem("userId"));

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ROUTE}api/data/${registration.id}`,
        {
          concept: data.concept,
          amount: data.amount,
          userId,
        }
      );
      swal({
        text: "The Registration edited  successfully!",
        icon: "success",
      });
      navigate("/home");
    } catch (error) {
      swal({
        text: error,
        icon: "error",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className=" d-flex align-items-center flex-column  ">
        <h1 className="textEdit">Edit The Registration!</h1>
        <form
          className="border border-3 border-secondary m-3  p-4 w-25 mb-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput " className="form-label ">
              Concept
            </label>
            <input
              type="Text"
              name="concept"
              className="form-control border-info border-2"
              id="formGroupExampleInput"
              placeholder="Example Buy Vegetables "
              defaultValue={registration.concept}
              {...register("concept", {
                required: {
                  value: true,
                  message: "The field is required",
                },
                minLength: {
                  value: 3,
                  message: "Write at least 3 characters",
                },
              })}
            />
            {errors.concept && (
              <span className="message">{errors.concept.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              className="form-control border-info border-2"
              id="formGroupExampleInput2"
              placeholder="Example $300"
              defaultValue={registration.amount}
              {...register("amount", {
                required: {
                  value: true,
                  message: "The field is required",
                },
              })}
            />
            {errors.amount && (
              <span className="message">{errors.amount.message}</span>
            )}
          </div>
          <input
            className="btn btn-primary w-100 mt-4"
            type="submit"
            value="Edit"
          />
        </form>
        <button
          className="btn btn-outline-secondary w-25 mb-3 "
          onClick={() => {
            navigate("/home");
          }}
        >
          Atras
        </button>
      </div>
    </div>
  );
}

export default EditRegistration;
