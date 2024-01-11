import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Star from '../Star/Star';
import "./Modal.css";
import axios from 'axios';
import { IoIosClose } from "react-icons/io";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";

const Modals = ({ data }) => {


  useEffect(() => {
    const modalTimeout = setTimeout(() => {
      document.querySelector('.modal').classList.remove('show');
    }, 5000);

    return () => clearTimeout(modalTimeout);
  }, []);



  

  

  return (
    <div>
      <Modal.Dialog
      className="modal-lg"
      centered style={{  borderRadius: "10px" }}>
      <Modal.Body style={{ backgroundColor: "#fcfcfc", borderRadius: "10px" }}>
  
          <div
            className=" d-flex"
            style={{
              width: "765px",
              height: "500px",
              backgroundColor: "white",
              padding: "0px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Add box shadow

            }}>
            <div
              style={{
                backgroundColor: "#f9e6d6",
                width: "250px",
                height: "100%",
              }}>
              <div
                style={{ height: "100%", marginLeft: 0 }}
                className="d-flex justify-content-center align-items-center">
                <div>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={
                        data.Image
                          ? data.Image
                          : "../../../image/Men.png"
                      }
                      alt=""
                      style={{
                        borderRadius: "100px",
                        width: "200px",
                        height: "200px",
                        border: "2px solid #6efe67",
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <h4 style={{ fontSize: "20px", color: "#00a500" }}>
                    
                      {data.lastName &&
                        data.firstName &&
                        `${data.firstName} ${data.lastName}`}
                    </h4>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "gray",
                    }}>
                    {data.Description && data.Description}
                  </div>
                </div>
              </div>
            </div>

            {/*main column 2*/}
            <div style={{ width: "515px", backgroundColor: "#ddfedb" }}>
              <h1
                style={{ marginRight: "50px", color: "green" }}
                className="d-flex justify-content-center mt-4  ">
                Employee Details
              </h1>
              <div
                className=" mt-lg-5 "
                style={{ marginLeft: "40px", fontSize: "14px" }}>
                {data.firstName && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Full Name</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}
                      {data.firstName} {"\u00A0"}
                      {data.lastName}
                    </div>
                  </div>
                )}
                {data.contactNumber && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Contact Number</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}0{data.contactNumber}
                    </div>
                  </div>
                )}
                {data.GitUserName && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Git User Name</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}
                      {data.GitUserName}
                    </div>
                  </div>
                )}
                {data.email && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Email Address</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}
                      {data.email}
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center align-items-center mt-2">
                <hr style={{ width: "80%", color: "green" }} />
              </div>

              <div
                style={{ width: "100%", backgroundColor: "#ccfac8" }}
                className="d-flex">
                <div style={{ width: "30%", borderRight: "4px solid lightGreen " }}>
                  <strong className="d-flex justify-content-center align-items-center">
                    Teams
                  </strong>
                  <div className="ms-2">
                    {data.SelectedTeams.map((team, i) => {
                      return (
                        <div className="d-flex  align-items-center">
                          <VscDebugBreakpointLogUnverified color="orange" />
                          <p key={i}>{team}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ width: "70%" }}>
                  <strong className="d-flex justify-content-center align-items-center">
                    Projects
                  </strong>
                  <div className="ms-2">
                    {data.Projects.map((project, i) => {
                      return (
                        <div className="d-flex  align-items-center">
                          <VscDebugBreakpointLogUnverified color="orange" />
                          <p key={i}>{project}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </Modal.Body>
    </Modal.Dialog>
    </div>
  );
};

export default Modals;
