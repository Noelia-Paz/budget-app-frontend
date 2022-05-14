import React from "react";
import "./headerMain.scss";
import { FaBalanceScale } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  return (
    <nav class="navbar navbar-success bg-success d-flex justify-content-between px-5">
      <div>
        <p>Personal Expense Manager</p>
      </div>
      <div>
        <FaBalanceScale className="iconUser" />
      </div>
    </nav>
  );
}

export default Header;
