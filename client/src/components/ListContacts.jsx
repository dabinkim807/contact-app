import { useState, useEffect } from "react";

import Contact from "./Contact";
import Detail from "./Detail";
import AddContact from "./AddContact"
import EditContact from "./EditContact";

function ListContacts() {

	const [contacts, setContacts] = useState([]);
	const [display, setDisplay] = useState({
		name: "",
		email: "",
		phone: "",
		notes: ""
	});

	const getRequest = () => {
		fetch("http://localhost:8081/api/contacts")
		.then((response) => response.json())
		.then(contacts => {
			setContacts(contacts); 
			console.log('contacts fetched...', contacts);
			});
	}
	
	useEffect(() => {getRequest()}, []);

	const [open, setOpen] = useState(false);
	const handleOpen = (contact) => {
		setDisplay(contact);
    setOpen(true);
  }
	const handleClose = () => setOpen(false);


	const [addOpen, setAddOpen] = useState(false);
	const handleAddOpen = () => {
    setAddOpen(true);
  }
	const handleAddClose = () => setAddOpen(false);

	
	const [editOpen, setEditOpen] = useState(false);
  const [toEdit, setToEdit] = useState({
    id: 0
  });
  const handleEditOpen = (contact) => {
    setToEdit(contact);
    setEditOpen(true);
  }
  const handleEditClose = () => {
		setEditOpen(false);
		setOpen(false);
	}

	return (
		<div className="contact-list">
      <ul>
        {contacts.map((contact, i) => {
          return <li key={i}> <Contact contact={contact} handleOpen={handleOpen} handleEditOpen={handleEditOpen} setToEdit={setToEdit} /></li>
        })}
      </ul>
			
			<button onClick={() => handleAddOpen()}>Add Contact</button>

			<Detail open={open} onClose={handleClose} display={display} />
			<AddContact open={addOpen} onClose={handleAddClose} contacts={contacts} setContacts={setContacts} />
			<EditContact open={editOpen} onClose={handleEditClose} handleEditOpen={handleEditOpen} contacts={contacts} setContacts={setContacts} setEditOpen={setEditOpen} toEdit={toEdit} setToEdit={setToEdit} />
		</div>
	);
}

export default ListContacts;
