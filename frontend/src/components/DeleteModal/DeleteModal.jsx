import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import Swal from 'sweetalert2'
import axios from "axios";

const DeleteModal = ({handleDeleteClose,showDelete,userData,handleDelete}) => {

  const handleDeleteButtonClick = async () => {
    await handleDelete(); // Call the handleDelete function provided by UserDetails
    handleDeleteClose(); // Close the modal
  };
  return (
    <div>   
        <Modal show={showDelete} onHide={handleDeleteClose}>
  <Modal.Header>
    <Modal.Title style={{ margin: "auto", paddingLeft: "0px", fontSize: "30px" }}>
      Confirm Deletion
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this user?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleDeleteClose}>
      Close
    </Button>
    <Button variant="danger" onClick={handleDeleteButtonClick}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

  </div>
  )
}

export default DeleteModal