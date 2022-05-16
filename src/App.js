import "./App.scss";
import "bootstrap/scss/bootstrap.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HeaderMain from "./components/HeaderMain/HeaderMain";
import Main from "./components/Main/Main";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import InsertRegistration from "./components/InsertRegistration/InsertRegistration";
import Home from "./components/Home/Home";
import EditRegistration from "./components/EditRegistration/EditRegistration";
import RegistrationList from "./components/RegistrationList/RegistrationList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthenticated")));
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <HeaderMain
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route
            path="/"
            element={<Main setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/registerUser" element={<RegisterUser />} />
          {isAuthenticated && (
            <>
              <Route path="/home" element={<Home />} />
              <Route
                path="/insertRegistration"
                element={<InsertRegistration />}
              />
              <Route path="/editRegistration" element={<EditRegistration />} />
              <Route path="/list" element={<RegistrationList />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
