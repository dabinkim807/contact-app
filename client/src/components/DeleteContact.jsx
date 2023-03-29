import {useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const DeleteContact = (props) => {
  // open={delOpen} onClose={handleDelClose} contacts={contacts} setContacts={setContacts} toDelete={toDelete} setToDelete={setToDelete}

  const deleteRequest = (id) => {
    fetch(`http://localhost:8081/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/JSON"
      },
    })
      .then((response) => {
        if (response.status === 400) {
          response.text().then(function (text) {
            alert(text);
          });
        } else {
          let updateDelete = [...props.contacts];

          for (let i = 0; i < updateDelete.length; i++) {
            if (updateDelete[i].id === id) {
              updateDelete.splice(i, 1);
              break;
            }
          }
          props.setContacts(updateDelete);
        }
      })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRequest(props.toDelete.id);
    props.onClose();
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="delete-modal">
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>          
          <h2>Delete Individual</h2> 
          Are you sure you want to delete individual with id: {props.toDelete.id}?
          <button type="submit" onClick={props.onClose}>Cancel</button>
          <button type="submit" onClick={handleDelete}>Delete</button>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteContact;