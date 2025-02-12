import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register"


const NotFoundRedirect = () => {
    window.location.href = "/";
    return null;
  };
  
const LoggedOutRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
  );
};

export default LoggedOutRoutes;
