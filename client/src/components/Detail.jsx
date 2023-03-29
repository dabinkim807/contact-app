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
          {/* <form>
            <label>Name</label>
            <input
              type="text"
              id="add-event-name"
              placeholder="Add event name"
              required
              value={event.name}
              onChange={handleNameChange}
            />
            <label>Date</label>
            <input 
              type="datetime-local"
              id="date"
              required
              value={event.date}
              onChange={handleDateChange}
            />
            <label>Description</label>
            <input 
              type="text"
              id="desc"
              placeholder="Add description"
              value={event.description}
              onChange={handleDescChange}
            />
            <label>Category</label>
            <select id="category" defaultValue={event.category} onChange={handleCatChange}>
              <option value="" disabled>--Please choose an option--</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select> 
            <button type="submit" onClick={props.onClose}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form> */}
        </Box>
      </Modal>
    </div>
  )
}

export default Detail;