import { useState, useEffect } from "react";

import Contact from "./Contact";
import Detail from "./Detail";
import AddContact from "./AddContact"


function ListContacts() {

	const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
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

	const handleOpen = (contact) => {
		setDisplay(contact);
    setOpen(true);
  }
	const handleClose = () => setOpen(false);

	const handleAddOpen = () => {
    setAddOpen(true);
  }
	const handleAddClose = () => setAddOpen(false);

	return (
		<div className="contact-list">
      <ul>
        {contacts.map((contact, i) => {
          return <li key={i}> <Contact contact={contact} handleOpen={handleOpen} /></li>
        })}
      </ul>
			
			<button onClick={() => handleAddOpen()}>Add Contact</button>

			<Detail open={open} onClose={handleClose} display={display} />
			<AddContact open={addOpen} onClose={handleAddClose} contacts={contacts} setContacts={setContacts} />
		</div>
	);
}

export default ListContacts;
