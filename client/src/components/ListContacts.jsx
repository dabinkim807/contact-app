import { useState, useEffect } from "react";

import Contact from "./Contact";
import Detail from "./Detail";


function ListContacts() {

	const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
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

	return (
		<div className="contact-list">
      <ul>
        {contacts.map((contact) => {
          return <li key={contact.id}> <Contact contact={contact} handleOpen={handleOpen} /></li>
        })}
      </ul>

			<Detail open={open} onClose={handleClose} display={display} />
		</div>
	);
}

export default ListContacts;
