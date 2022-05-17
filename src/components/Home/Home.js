import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.scss";

function Home() {
  let navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [registrations, setRegistrations] = useState([]);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const getUserBalance = async () => {
    const userBalance = await axios.get(
      `${process.env.REACT_APP_API_ROUTE}api/data/balance/${userId}`
    );
    setBalance(userBalance.data[0].amount);
  };

  const getRegistrations = async () => {
    const registrations = await axios.get(
      `${process.env.REACT_APP_API_ROUTE}api/data/userId/${userId}`
    );
    setRegistrations(registrations.data.reverse());
  };

  useEffect(() => {
    getUserBalance();
    getRegistrations();
  }, [balance]);

  return (
    <div>
      <div className="d-flex justify-content-center my-5">
        <div className="card text-bg-light text-center shadow-lg">
          <div className="card-body">
            <div className="card-title">Your balance is:</div>
            <div className="card-subtitle">${balance}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="text-center my-5 fs-2">Last 10 Registrations</h1>
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
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{registration.concept}</td>
                  <td>{registration.amount}</td>
                  <td>{registration.registrationTypeId}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
