import React from "react";
import { Modal } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
const ShowModal = ({ userShow, handleUserClose, selectedUser }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  const formatContactNumber = (contactNumber) => {
    // Assuming the contact number is in the format "0713246556"
    const formattedContactNumber = contactNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1 $2 $3"
    );
    return formattedContactNumber;
  };

  return (
    <Modal
      show={userShow}
      onHide={handleUserClose}
      className="modal-lg"
      centered>
      <Modal.Body style={{ backgroundColor: "#fcfcfc", borderRadius: "5px" }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            right: "15px",
            height: "40px",
            width: "40px",
            backgroundColor: "#87f389",
            borderRadius: "40px",
          }}
          onClick={() => handleUserClose()}>
          <IoIosClose size={35} />
        </div>
        {console.log(selectedUser)}
        {selectedUser && (
          <div
            className=" d-flex"
            style={{
              width: "765px",
              height: "500px",
              backgroundColor: "lightblue",
              padding: "0px",
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
                        selectedUser.Image
                          ? selectedUser.Image
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
                    
                      {selectedUser.lastName &&
                        selectedUser.firstName &&
                        `${selectedUser.firstName} ${selectedUser.lastName}`}
                    </h4>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "gray",
                    }}>
                    {selectedUser.Description && selectedUser.Description}
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
                {selectedUser.firstName && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Full Name</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}
                      {selectedUser.firstName} {"\u00A0"}
                      {selectedUser.lastName}
                    </div>
                  </div>
                )}
                {selectedUser.contactNumber && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Contact Number</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}0{selectedUser.contactNumber}
                    </div>
                  </div>
                )}
                {selectedUser.GitUserName && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Git User Name</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}
                      {selectedUser.GitUserName}
                    </div>
                  </div>
                )}
                {selectedUser.email && (
                  <div className="row mt-2">
                    <div className="col-4">
                      <strong>Email Address</strong>
                    </div>
                    <div className="col-7">
                      :{"\u00A0"}
                      {"\u00A0"}
                      {"\u00A0"}
                      {selectedUser.email}
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
                    {selectedUser.SelectedTeams.map((team, i) => {
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
                    {selectedUser.Projects.map((project, i) => {
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
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShowModal;
