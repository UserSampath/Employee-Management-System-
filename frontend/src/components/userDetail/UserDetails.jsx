import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import IconButton from "../IconButton/IconButton";
import { FaStar } from "react-icons/fa";
import EditUserModal from "../EditUserModal/EditUserModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
const UserDetails = ({ user, onUserDeleted, getUserData }) => {
  const [show, setShow] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const [avgStars, setAvgStars] = useState(0);

  useEffect(() => {
    const getAvgStars = () => {
      if (user.Rate.length === 0) {
        setAvgStars(0);
      } else {
        let sumStars = 0;
        for (let i = 0; i < user.Rate.length; i++) {
          sumStars = sumStars + user.Rate[i];
        }
        setAvgStars(Math.floor(sumStars / user.Rate.length));
      }
    };

    getAvgStars();
  }, [user]);

  const handleEditUser = async (updatedUserData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/rate/updateUser/${user._id}`,
        updatedUserData
      );
      getUserData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    console.log(user._id);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/rate/deleteRateUser/${user._id}`
      );

      if (response.status === 200) {
        const { message, deletedRateUser } = response.data;
        Swal.fire({
          icon: "success",
          title: "Success! ",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Rateuser data:", deletedRateUser);
        handleDeleteClose();
        onUserDeleted(user._id);
      } else {
        console.error("Error deleting user rate:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting user rate:", error.message);
    }
  };

  return (
    <div>
      {" "}
      <Container
        className="d-flex justify-content-between align-items-center mt-2"
        style={{
          backgroundColor: "#dff8dd79",
          borderBottom: "1px solid #91fb8c",
          borderRadius: "4px",
          height: "55px",
          boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
        }}>
        <div
          className="col-3"
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <img
            src={user.Image ? user.Image : "../../../image/Men.png"}
            alt=""
            style={{
              borderRadius: "50px",
              width: "45px",
              height: "45px",
              border: "2px solid #6efe67",
            }}
          />
          <div
            style={{
              fontSize: "18px",
              marginLeft: "10px",
              color: "green",
              fontWeight: "600",
            }}>
            {user.firstName + " " + user.lastName}
          </div>
        </div>
        <p
          style={{ fontSize: "17px", color: "gray", fontWeight: "600" }}
          className="col-2">
          {user.Job}
        </p>

        <div className="col-2 d-flex justify-content-center align-items-center">
          {[...Array(avgStars)].map((_,index) => (
            <FaStar color="gold" key={index} />
          ))}
          {[...Array(5 - avgStars)].map((_,index) => (
            <FaStar color="gray" key={index} />
          ))}
          <div style={{ fontSize: "16px", marginTop: "4px", color: "gray" }}>
            ({user.Rate.length})
          </div>
        </div>

        <div className="m-3 d-flex">
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
            }}
            onClick={handleShow}>
            <IconButton text="Edit" buttonColor={"green"} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
            }}
            onClick={handleDeleteShow}>
            <IconButton text="Delete" buttonColor={"red"} />
          </button>
        </div>
      </Container>
      <EditUserModal
        show={show}
        handleClose={handleClose}
        userData={user}
        handleEdit={handleEditUser}
      />
      <DeleteModal
        userData={user}
        showDelete={showDelete}
        handleDeleteClose={handleDeleteClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserDetails;
