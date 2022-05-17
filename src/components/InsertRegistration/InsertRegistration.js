import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "./insertRegistration.scss";
import "react-datepicker/dist/react-datepicker.css";

function InsertRegistration() {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("1");
  const userId = JSON.parse(localStorage.getItem("userId"));

  let navigate = useNavigate();
  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}api/data/`, {
        ...("category" in data && { categoryId: data.category }),
        concept: data.concept,
        amount: data.amount,
        registrationTypeId: transactionType,
        date: startDate.toISOString().split("T")[0],
        userId,
      });
      swal({
        text: "New transaction created successfully!",
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

  const onTransactionTypeChange = (data) => {
    setTransactionType(data.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className=" p-4 d-flex align-items-center flex-column">
      <h1 className="textTitle">Insert a New Registration!</h1>
      <h3 className="textType">Select the Type of Registration!</h3>
      <select
        className="form-select border-info border-2 w-50 mb-5"
        name="type"
        aria-label="Default select example"
        onChange={onTransactionTypeChange}
      >
        <option value="1">Income</option>
        <option value="2">Outcome</option>
      </select>
      <form
        className="border border-3 border-secondary  p-4 w-50 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput " className="form-label ">
            Concept
          </label>
          <input
            type="text"
            name="concept"
            className="form-control border-info border-2"
            id="formGroupExampleInput"
            placeholder="Example Buy Vegetables "
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
        {transactionType === "2" && (
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Category
            </label>
            <select
              className="form-select border-info border-2"
              aria-label="Default select example"
              name="category"
              {...register("category", {
                required: {
                  value: true,
                  message: "The field is required",
                },
              })}
            >
              <option defaultValue>Select the expense Category</option>
              <option value="1">Food</option>
              <option value="2">Services</option>
              <option value="3">Rent</option>
              <option value="3">Others</option>
            </select>

            {errors.category && (
              <span className="message">{errors.category.message}</span>
            )}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput " className="form-label ">
            Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border border-info w-100 border-2 container"
          />
        </div>
        <div className="buttonIsertar ">
          <button type="submit" className="btn btn-info w-100 mt-4 ">
            Insert
          </button>
        </div>
      </form>
      <button
        className="btn btn-outline-secondary w-50 mt-3"
        onClick={() => {
          navigate("/home");
        }}
      >
        Atras
      </button>
    </div>
  );
}

export default InsertRegistration;
