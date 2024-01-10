import React from 'react'
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { Form } from 'react-bootstrap';
import Axios from 'axios';
import { FaUser, FaBriefcase, FaFile, FaImage ,FaUsers} from 'react-icons/fa';
import FileBase64 from "react-file-base64";
import { SlCalender } from "react-icons/sl";
import Select from 'react-select';
import { RiContactsBookFill } from "react-icons/ri";
import { SiPaloaltonetworks } from "react-icons/si";

const EditUserModal = ({ handleClose, show, userData, handleEdit }) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    Job: "",
    Description: "",
    Image: null,
    StartedDate: "",
    SelectedTeams: [],
    email: "",
    Projects: [],
    contactNumber :"" ,
    GitUserName : ""

  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    Job: false,
    StartedDate :false,
    email: false,
    contactNumber:false,
  });

  const handleTeamSelect = (selectedOptions) => {
    const selectedTeams = selectedOptions.map(option => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      SelectedTeams: selectedTeams,
    }));
  };

 {} useEffect(() => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      Job: userData.Job,
      Description: userData.Description,
      Image: userData.Image,
      StartedDate:userData.StartedDate,
      SelectedTeams:userData.SelectedTeams,
      email:userData.email,
      Projects:userData.Projects,
      contactNumber:userData.contactNumber,
      GitUserName : userData.GitUserName

    });
 
}, [userData]);

useEffect(() => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    StartedDate: formatDate(userData.StartedDate),
  }));
}, [userData]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

  const handleProjectInputChange = (e) => {
    const input = e.target.value;
    const projects = input.split(',').map(project => project.trim());
    setFormData((prevFormData) => ({
      ...prevFormData,
      Projects: projects,
    }));
  }

  
  const [teams, setTeams] = useState([
    { value: "Web Team", label: "Web Team" },
    { value: "Api Team", label: "Api Team" },
    { value: "Flutter Team", label: "Flutter Team" },
    { value: "Qa Team", label: "Qa Team" },
    { value: "Ui Team", label: "Ui Team" },
  ]);


  return (
    <div>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header>
          <Modal.Title
            style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
            Edit Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto', padding:"30px" }}>
          <Form>
            <Form.Group controlId="formFirstName" className="mb-2">
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

            <Form.Group controlId="formLastName" className="mb-2">
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
            <Form.Group controlId="formEmail" className="mb-2">
              <Form.Label>
                <FaUser /> Email:
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                style={{ borderRadius: "10px" }}

              />
                
            </Form.Group>
            <Form.Group controlId="formJob" className="mb-2">
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

            <Form.Group controlId="formDescription" className="mb-2">
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

            <Form.Group controlId="formContactNumber" className="mb-2">
              <Form.Label>
                <RiContactsBookFill /> Contact Number:
              </Form.Label>
              <Form.Control
               type="text"
               name="contactNumber"
               value={'0' + formData.contactNumber}  // Include '0' in the displayed value
               onChange={handleInputChange}
               placeholder="Enter Contact Number"
               style={{ borderRadius: "10px" }}

            />
                  <Form.Control.Feedback type="invalid">
                Please enter your Contact number.
              </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGitUserName" className="mb-2">
              <Form.Label>
                <RiContactsBookFill /> GitUser Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="GitUserName"
                value={formData.GitUserName}
                onChange={handleInputChange}
                placeholder="Enter GitUser Name"
                style={{ borderRadius: "10px" }}
              />
             
              </Form.Group>


            <Form.Group controlId="formProjects" className="mb-2">
              <Form.Label>
                <SiPaloaltonetworks /> Projects:
              </Form.Label>
              <Form.Control
                type="text"
                name="Projects"
                value={formData.Projects.join(', ')}
                onChange={handleProjectInputChange}
                placeholder="Enter project names, separated by commas"
                style={{ borderRadius: "10px" }}
              />
              </Form.Group>

            <Form.Group controlId="formStartedDate" className="mb-2">
            <Form.Label>
              <SlCalender /> Started Date:
            </Form.Label>
            <Form.Control
              type="date"
              name="StartedDate"
              value={formData.StartedDate}
              onChange={handleInputChange}
              style={{ borderRadius: "10px" }}
              isInvalid={touched.StartedDate && !formData.StartedDate}

            />
             <Form.Control.Feedback type="invalid">
                Please enter your Started Date.
              </Form.Control.Feedback>
          </Form.Group>

         <Form.Group controlId="formSelectedTeams" className="mb-2">
              <Form.Label>
                <FaUsers /> Selected Teams:
              </Form.Label>
              <Select
                isMulti
                options={teams}
                value={teams.filter(option => formData.SelectedTeams.includes(option.value))}
                onChange={handleTeamSelect}
              />
            </Form.Group>


            <Form.Group controlId="formImage"  className="mb-2">
              <Form.Label>
                <FaImage /> Image Upload:
              </Form.Label>
              <div>
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
              </div>
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