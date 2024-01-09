import React from 'react';
import { Modal } from 'react-bootstrap';

const ShowModal = ({ userShow, handleUserClose, selectedUser }) => {
  return (
    <Modal show={userShow} onHide={handleUserClose} centered>
    <Modal.Body>
      {selectedUser && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={selectedUser.Image ? selectedUser.Image : '../../../image/Men.png'}
            alt=""
            style={{
              borderRadius: '50px',
              width: '120px',
              height: '120px',
              border: '2px solid #6efe67',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:"5px" }}>
            <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
          </div>
          <p>Job: {selectedUser.Job}</p>
          <p>Teams: {Array.isArray(selectedUser.SelectedTeams) ? selectedUser.SelectedTeams.join(", ") : selectedUser.SelectedTeams}</p>
          <p>Projects: {Array.isArray(selectedUser.Projects) ? selectedUser.Projects.join(", ") : selectedUser.SelectedTeams}</p>
        </div>
      )}
    </Modal.Body>
  </Modal>
  
  );
};

export default ShowModal;
