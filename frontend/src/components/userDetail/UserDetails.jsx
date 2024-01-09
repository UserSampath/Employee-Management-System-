import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import IconButton from "../IconButton/IconButton";
import { FaStar } from "react-icons/fa";
import EditUserModal from "../EditUserModal/EditUserModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import ShowModal from "../ShowMemberModal/ShowModal";
const UserDetails = ({ user, onUserDeleted, getUserData , onClick}) => {
  const [show, setShow] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const [avgStars, setAvgStars] = useState(0);

  const [userShow, setUserShow] = useState(false);
  const handleUserClose = () => setUserShow(false);
  const handleUserShow = () => setUserShow(true);


  
  const handleUserDetailsClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/member/getMember/${user._id}`
      );

      if (response.status === 200) {
        const selectedUserDetails = response.data.Member;
        setSelectedUser(selectedUserDetails);
        handleUserShow(); // Open the modal with fetched user details
      } else {
        console.error("Error fetching user details:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };


  const handleEditUser = async (updatedUserData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/member/updateMember/${user._id}`,
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
        `http://localhost:4000/api/member/deleteMember/${user._id}`
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
        console.log("Member data:", deletedRateUser);
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
    <div style={{ cursor: 'pointer' }} >
      {" "}
      <Container
        className="d-flex justify-content-between align-items-center mt-2"
        style={{
          backgroundColor: "#dff8dd79",
          borderBottom: "1px solid #91fb8c",
          borderRadius: "4px",
          height: "55px",
          boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",}}>
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
            onClick={handleUserDetailsClick}/>
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
      <ShowModal
        userShow={userShow}
        handleUserClose={handleUserClose}
        selectedUser={selectedUser}
      />
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
