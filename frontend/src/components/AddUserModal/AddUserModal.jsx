import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap";
import { FaUser, FaBriefcase, FaFile, FaImage } from "react-icons/fa";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import "./AddUserModal.css";
import FileBase64 from "react-file-base64";
import axios from "axios";

const AddUserModal = ({ handleClose, show, getUserData, setShow }) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    Job: "",
    Description: "",
    Image: null,
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      Job: "",
      Description: "",  
      Image: null,
    });
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    formData.Image = image;
    console.log(formData);

    await axios
      .post("http://localhost:4000/api/rate/addNewRateUser", formData)
      .then((response) => {
        setImage("");
        setShow(false);
        getUserData();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text:"User added successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Error submitting data. Please try again.",
        });
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title
            style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
            Add User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>
                <FaUser /> First Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>
                <FaUser /> Last Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="formJob">
              <Form.Label>
                <FaBriefcase /> Job:
              </Form.Label>
              <Form.Control
                type="text"
                name="Job"
                value={formData.Job}
                onChange={handleInputChange}
                placeholder="Enter your job"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>
                <FaFile /> Description:
              </Form.Label>
              <Form.Control
                as="textarea"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                placeholder="Enter your description"
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>
                <FaImage /> Image Upload:
              </Form.Label>
              <FileBase64
                type="file"
                multiple={false}
                onDone={(e) => {
                  setImage(e.base64);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserModal;
