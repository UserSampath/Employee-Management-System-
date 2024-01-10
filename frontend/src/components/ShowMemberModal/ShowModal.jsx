import React from 'react';
import { Modal } from 'react-bootstrap';

const ShowModal = ({ userShow, handleUserClose, selectedUser }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  };
  const formatContactNumber = (contactNumber) => {
    // Assuming the contact number is in the format "0713246556"
    const formattedContactNumber = contactNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    return formattedContactNumber;
  };
  
  
  return (
    <Modal show={userShow} onHide={handleUserClose} centered>
   <Modal.Body>
  {selectedUser && (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <img
          src={selectedUser.Image ? selectedUser.Image : '../../../image/Men.png'}
          alt=""
          style={{
            borderRadius: '100px',
            width: '120px',
            height: '120px',
            border: '2px solid #6efe67',
          }}
        />
      </div>
      <div style={{ marginLeft: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
        </div>
        <div style={{textAlign: 'center'}}>
        <h5>{selectedUser.Job}</h5>
        <p>{selectedUser.email}</p>
        <div>
        <p>Contact number : 0{selectedUser.contactNumber}</p>
        <p>Git UserName : {selectedUser.GitUserName}</p>
        <p>Teams: {Array.isArray(selectedUser.SelectedTeams) ? selectedUser.SelectedTeams.join(", ") : selectedUser.SelectedTeams}</p>
        <p>Projects: {Array.isArray(selectedUser.Projects) ? selectedUser.Projects.join(", ") : selectedUser.SelectedTeams}</p>
        <p>Started Date: {formatDate(selectedUser.StartedDate)}</p>     
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
