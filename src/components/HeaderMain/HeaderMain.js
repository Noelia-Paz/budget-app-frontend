import React, { useState, useEffect } from "react";
import "./headerMain.scss";
import { FaBalanceScale } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header(props) {
  const { isAuthenticated, setIsAuthenticated } = props;
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    navigate("/");
  };

  const getUsername = async () => {
    const userId = await JSON.parse(localStorage.getItem("userId"));
    const username = await axios.get(
      `${process.env.REACT_APP_API_ROUTE}api/data/username/${userId}`
    );
    setUsername(username.data);
  };

  useEffect(() => {
    getUsername();
  }, [isAuthenticated]);

  return (
    <nav className="navbar navbar-success bg-success d-flex justify-content-between ">
      <div>
        <a href={isAuthenticated ? "/home" : ""} className="Textmanager">
          Personal Expense Manager
        </a>
        <FaBalanceScale className="iconUser mx-3" />
      </div>
      <div className="header">
        {isAuthenticated && (
          <>
            <span className="itemText">
              Welcome {username} <BsEmojiSmile />
            </span>
            <a
              href="/insertRegistration"
              className="item mx-1 btn btn-outline-info"
            >
              Add new Registration
            </a>
            <a href="/list" className="item mx-3 btn btn-outline-info">
              Registration Lists
            </a>
            <button
              className="btnlogout  btn btn-outline-light "
              onClick={logout}
            >
              Logout
              <RiLogoutCircleRLine className="iconLogout" />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
