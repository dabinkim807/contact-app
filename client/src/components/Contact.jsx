import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'
import Avatar from '@mui/material/Avatar';


const Contact = (props) => {
  // contact={contact} handleOpen={handleOpen} handleEditOpen={handleEditOpen} handleDelOpen={handleDelOpen} 

  return (
    <Card onClick={ () => {console.log(props.contact); props.handleOpen(props.contact)} } style={{ cursor: "pointer" }}>
      <Card.Body>
        <Avatar>{props.contact.name[0]}</Avatar>
        <Card.Title>{props.contact.name}</Card.Title>
        <button onClick={() => {props.handleEditOpen(props.contact)}}>edit</button>
        <button onClick={() => {props.handleDelOpen(props.contact)}}>delete</button>
      </Card.Body>
    </Card>
  )

}

export default Contact;