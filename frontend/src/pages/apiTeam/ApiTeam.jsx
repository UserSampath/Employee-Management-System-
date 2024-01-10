import {useEffect, useState} from "react";
import Side from "../../components/side/Side";
import Navbars from "../../components/NavBar/Navbar";
import UserDetails from "../../components/userDetail/UserDetails";
import { FaPlus } from 'react-icons/fa'; 
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";

const ApiTeam = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
      const team="Api Team"
      await axios
        .get(`http://localhost:4000/api/member/getTeamMembers/${team}`)
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
          // navigate("/login");
        });
    };
  const handleUserDeleted = (deletedUserId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== deletedUserId)
    );
  };

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="adminPage">
      <Navbars />
      <div style={{ display: "flex" }}>
        <Side selected={"Api Team"} />
        <div
          className="ml-230px"
          style={{ marginLeft: "230px", marginTop: "50px", width: "100%" }}>
          <div
            style={{ marginRight: "80px" }}
            className="mt-2 d-flex justify-content-end">
            <SearchBar
              inputSearchMembers={users}
              setFilteredUsers={setFilteredUsers}
            />
     
          </div>

          {filteredUsers &&
            filteredUsers.map((user, index) => {
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

export default ApiTeam;
