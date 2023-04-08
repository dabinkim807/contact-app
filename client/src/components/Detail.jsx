import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const Detail = (props) => {
  // open={open} onClose={handleClose} display={display}

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
          <h2>{props.display.name}</h2>
          <p>Email: {props.display.email}</p>
          <p>Phone: {props.display.phone}</p>
          <p>Notes: {props.display.notes}</p>
        </Box>
      </Modal>
    </div>
  )
}

export default Detail;