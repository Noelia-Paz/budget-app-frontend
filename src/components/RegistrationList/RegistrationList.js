import React, { useState, useEffect } from "react";
import "./registrationList.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RegistrationList() {
  const [registrationsList, setRegistrationsList] = useState([]);
  let navigate = useNavigate();
  const [isIncome, setIncome] = useState("income");
  const userId = JSON.parse(localStorage.getItem("userId"));

  const onRegistrationTypeChange = (data) => {
    setIncome(data.target.value);
  };

  const getRegistrations = async () => {
    const registrations = await axios.get(
      `${process.env.REACT_APP_API_ROUTE}api/data/${isIncome}/${userId}`
    );
    setRegistrationsList(registrations.data);
  };

  const onDeleteRegistration = (registrationId) => {
    swal({
      title: "Remove",
      text: "¿Are you sure you want to delete the Registration?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (respuesta) => {
      if (respuesta) {
        try {
          await axios.delete(
            `${process.env.REACT_APP_API_ROUTE}api/data/${registrationId}`
          );
          swal({
            text: "The Registration was deleted successfully!",
            icon: "success",
            timer: "2000",
          });
          getRegistrations();
        } catch (error) {
          swal({
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    getRegistrations();
  }, [isIncome]);

  console.log(registrationsList);
  return (
    <div className="text-center">
      <h1>Choose registration type</h1>
      <div className="d-flex justify-content-center">
        <select
          className="form-select border-info border-2 w-25 mb-5"
          name="type"
          aria-label="Default select example"
          onChange={onRegistrationTypeChange}
        >
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Concept</th>
              <th scope="col">Amount</th>
              <th scope="col">Registration Type</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {registrationsList.map((registration, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{registration.concept}</td>
                  <td>{registration.amount}</td>
                  <td>
                    {registration.registrationTypeId === 1
                      ? "Income"
                      : "Outcome"}
                  </td>
                  <td>
                    {registration.categoryId ? registration.categoryId : "None"}
                  </td>
                  <td>{registration.date}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate("/editRegistration", {
                          state: { registration },
                        });
                      }}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => onDeleteRegistration(registration.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistrationList;
