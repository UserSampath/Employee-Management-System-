import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap";
import { FaUser, FaBriefcase, FaFile, FaImage ,FaUsers} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { SiPaloaltonetworks } from "react-icons/si";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import "./AddUserModal.css";
import FileBase64 from "react-file-base64";
import axios from "axios";
import Select from 'react-select';
import { RiContactsBookFill } from "react-icons/ri";
const AddUserModal = ({ handleClose, show, getUserData, setShow }) => {

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
  });


  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    Job: false,
    StartedDate :false,
    email: false,
    contactNumber:false,
  });

  const [image, setImage] = useState("");




  const handleTeamSelect = (selectedOptions) => {
    const selectedTeams = selectedOptions.map(option => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      SelectedTeams: selectedTeams,
    }));
  };

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      Job: "",
      Description: "",  
      Image: null,
      StartedDate: "",
      SelectedTeams: [],
      email: "",
      Projects: [],
      contactNumber :"",
    });
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleProjectInputChange = (e) => {
    const input = e.target.value;
    const projects = input.split(',').map(project => project.trim());
    setFormData((prevFormData) => ({
      ...prevFormData,
      Projects: projects,
    }));
  };

  

  const [teams, setTeams] = useState([
    { value: "Web Team", label: "Web Team" },
    { value: "Api Team", label: "Api Team" },
    { value: "Flutter Team", label: "Flutter Team" },
    { value: "Qa Team", label: "Qa Team" },
    { value: "Ui Team", label: "Ui Team" },
    // Add other teams as needed
  ]);

 
  const handleSubmit = async () => {
    formData.Image = image;
    console.log(formData);

        await axios
      .post("http://localhost:4000/api/member/addNewMember", formData)
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
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header>
          <Modal.Title
            style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
            Add Member
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
                isInvalid={touched.firstName && !formData.firstName}

              />
               <Form.Control.Feedback type="invalid">
                Please enter your first name.
              </Form.Control.Feedback>
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
                isInvalid={touched.lastName && !formData.lastName}

              />
               <Form.Control.Feedback type="invalid">
                Please enter your Last name.
              </Form.Control.Feedback>
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
                isInvalid={touched.email && !formData.email}

              />
               <Form.Control.Feedback type="invalid">
                Please enter your Email.
              </Form.Control.Feedback>
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
                isInvalid={touched.Job && !formData.Job}

              />
               <Form.Control.Feedback type="invalid">
                Please enter your Job.
              </Form.Control.Feedback>
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
                name="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter Contact Number"
                style={{ borderRadius: "10px" }}
                isInvalid={touched.contactNumber && !formData.contactNumber}

              />
               <Form.Control.Feedback type="invalid">
                Please enter your Contact number.
              </Form.Control.Feedback>
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

            <Form.Group controlId="formImage" className="mb-2">
              <Form.Label>
                <FaImage /> Image Upload:
              </Form.Label>
              <div>
              <FileBase64
                type="file"
                multiple={false}
                onDone={(e) => {
                  setImage(e.base64);
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
};

export default AddUserModal;
