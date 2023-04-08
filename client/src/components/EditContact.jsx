import {useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const EditContact = (props) => {
  // open={editOpen} onClose={handleEditClose} contacts={contacts} setContacts={setContacts} toEdit={toEdit} setToEdit={setToEdit}

  const handleNameChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, name: e.target.value}));
  }
  const handleEmailChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, email: e.target.value}));
  }
  const handlePhoneChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, phone: e.target.value}));
  }
  const handleNoteChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, notes: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const putRequest = () => {
      fetch(`http://localhost:8081/api/contacts/${props.toEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(props.toEdit)
      })
        .then((response) => {
          if (response.status === 400) {
            response.text().then(function (text) {
              alert(text);
            });
          } else {
            let n = [...props.contacts];
            for (let i = 0; i < n.length; i++) {
              if (n[i].id === props.toEdit.id) {
                n[i] = props.toEdit;
              }
            }
            props.setContacts(n);
            props.onClose();
          }
        })
    }
    putRequest();
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
    <div className="main-modal">
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>     
          <h2>Edit Contact</h2>
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              placeholder="Add name"
              required
              value={props.toEdit.name}
              onChange={handleNameChange}
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Add email"
              value={props.toEdit.email}
              onChange={handleEmailChange}
            />
            <label>Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Add phone number"
              required
              value={props.toEdit.phone}
              onChange={handlePhoneChange}
            />
            <label>Notes</label>
            <input
              type="text"
              id="notes"
              placeholder="Add notes"
              value={props.toEdit.notes}
              onChange={handleNoteChange}
            />
            <button type="submit" onClick={props.onClose}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EditContact;