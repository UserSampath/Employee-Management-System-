import {useEffect, useState} from "react";
import Side from "../../components/side/Side";
import Navbars from "../../components/NavBar/Navbar";
import UserDetails from "../../components/userDetail/UserDetails";
import { FaPlus } from 'react-icons/fa'; 
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users,setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    getUserData();
  }, []);
  
   const getUserData = async () => {
     await axios
       .get("http://localhost:4000/api/rate/getRateUsersForAdmin", {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
         },
       })
       .then((res) => {
         console.log(res.data);
         setUsers(res.data);
       })
       .catch((err) => {
         console.log(err);
         navigate("/login");
       });
   };
   const handleUserDeleted = (deletedUserId) => {
    setUsers(prevUsers => prevUsers.filter(user => user._id !== deletedUserId));
  };

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="adminPage">
      <Navbars />
      <div style={{ display: "flex" }}>
        <Side />
        <div
          className="ml-230px"
          style={{ marginLeft: "230px", marginTop: "50px", width: "100%" }}>
          <div
            style={{ marginRight: "80px" }}
            className="mt-2 d-flex justify-content-end">
            <button
              onClick={handleShow}
              className="button-1 d-flex justify-content-center align-items-center"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}>
              <FaPlus style={{ marginRight: "10px" }} />
              Add new
            </button>
          </div>

          {users &&
            users.map((user, index) => {
              return (
                <UserDetails
                  user={user}
                  key={index}
                  onUserDeleted={handleUserDeleted}
                  getUserData={getUserData}
                />
              );
            })}
        </div>
      </div>
      <AddUserModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        getUserData={getUserData}
      />
    </div>
  );
};

export default AdminDashboard;
