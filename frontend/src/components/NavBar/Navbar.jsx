import React, { useState } from "react";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../../image/Logo.png";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useNavigate } from "react-router-dom";
const Navbars = () => {

  const navigate = useNavigate()
  const [showLogOut, setShowLogOut] = useState(false);

  const clickedLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <div style={{ position: "fixed", width: "100% " }}>
      <Navbar expand="lg" className="nav" style={{ height: "50px" }}>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center ms-auto">
          <img
            style={{ marginLeft: "30px" }}
            src={Logo}
            alt=" Employee Management System"
            height="40"
            className="d-inline-block align-top"
          />
          <span
            style={{ color: "#ffffff", fontWeight: "600" }}
            className="ms-4">
            EMS
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <span style={{ color: "#ffffff", fontWeight: "600" }}>
            <div style={{ marginRight: "40px", fontWeight: "100" }}>
              {localStorage.getItem("userName") ? (
                <div>
                  {showLogOut && <LogOutButton onClick={clickedLogOut} />}

                  <div
                    className="signedInUser"
                    style={{ userSelect: "none" }}
                    onClick={() => setShowLogOut((prev) => !prev)}>
                    {localStorage.getItem("userName").replace(/"/g, "")}
                  </div>
                </div>
              ) : (
                <div
                  className="signedInUser"
                  onClick={() => navigate("/login")}>
                  Sign In
                </div>
              )}
            </div>
          </span>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbars;
