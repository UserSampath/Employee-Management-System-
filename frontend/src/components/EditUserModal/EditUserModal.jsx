import React from 'react'
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { Form } from 'react-bootstrap';
import Axios from 'axios';
import { FaUser, FaBriefcase, FaFile, FaImage } from 'react-icons/fa';
import FileBase64 from "react-file-base64";

const EditUserModal = ({ handleClose, show, userData, handleEdit }) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    Job: '',
    Description: '',
    Image: null, 
  });

 {} useEffect(() => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      Job: userData.Job,
      Description: userData.Description,
      Image: userData.Image,
    });
 
}, [userData]);

  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    })); 
  };

  const handleSubmit = (e) => {
 handleEdit(formData);
    handleClose();
  }


  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title
            style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
            Edit User
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
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    Image: e.base64,
                  }));
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
}

export default EditUserModal