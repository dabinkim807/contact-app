import { useState, useEffect } from "react";
import Contact from "./Contact";
// import EventsTable from "./eventsTable";
// import AddOrEdit from "./addOrEdit";

function Contacts() {
	const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);

	const getRequest = () => {
		fetch("http://localhost:8081/api/contacts")
		.then((response) => response.json())
		.then(contacts => {
			setContacts(contacts); 
			console.log('contacts fetched...', contacts);
			});
	}

	useEffect(() => {getRequest()}, []);

	const handleOpen = () => {
    setOpen(true);
  }
	const handleClose = () => setOpen(false);

	return (
		<div className="contact-list">
			<button onClick={handleOpen}>Add Contact</button>
      <ul>
        {contacts.map((contact) => {
          return <li key={contact.id}> <Contact contact={contact} /></li>
        })}
      </ul>
		</div>
	);
}

export default Contacts;
