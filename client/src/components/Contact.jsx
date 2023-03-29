import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'
import Avatar from '@mui/material/Avatar';


const Contact = (props) => {
  // contact={contact} handleOpen={handleOpen}

  // const onDelete = (toDeleteStudent) => {
  //   toDelete(toDeleteStudent)
  // }


  return (
    <Card onClick={ () => {console.log(props.contact); props.handleOpen(props.contact)} } style={{ cursor: "pointer" }}>
      <Card.Body>
        <Avatar>{props.contact.name[0]}</Avatar>
        <Card.Title>{props.contact.name}</Card.Title>
        <Button variant="outline-danger" onClick={()=>{onDelete(student)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
      </Card.Body>
    </Card>
  )

}

export default Contact;