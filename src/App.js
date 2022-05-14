import "./App.scss";
import "bootstrap/scss/bootstrap.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeaderMain from "./components/HeaderMain/HeaderMain";
import Main from "./components/Main/Main";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import InsertRegistration from "./components/InsertRegistration/InsertRegistration";
import Home from "./components/Home/Home";
function App() {
  return (
    <>
      <Router>
        <HeaderMain />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/insertRegistration" element={<InsertRegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
