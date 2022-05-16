import React, { useState, useEffect } from "react";
import "./headerMain.scss";
import { FaBalanceScale } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header(props) {
  const { isAuthenticated, setIsAuthenticated } = props;
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  const userId = JSON.parse(localStorage.getItem("userId"));

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    navigate("/");
  };

  const getUsername = async () => {
    const username = await axios.get(
      `${process.env.REACT_APP_API_ROUTE}api/data/username/${userId}`
    );
    setUsername(username.data);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <nav className="navbar navbar-success bg-success d-flex justify-content-between px-5">
      <div>
        <a href={isAuthenticated ? "/home" : ""} className="item">
          Personal Expense Manager
        </a>
        <FaBalanceScale className="iconUser mx-3" />
      </div>
      <div>
        <span className="item">Welcome {username}</span>
      </div>
      <div>
        {isAuthenticated && (
          <>
            <a href="/list" className="item mx-3 btn btn-outline-dark">
              Registration Lists
            </a>
            <a href="/insertRegistration" className="item btn btn-outline-dark">
              Add new transaction
            </a>
            <button className="btn btn-outline-light mx-5" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
