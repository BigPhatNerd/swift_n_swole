import React, { useState, useContext } from 'react';
import { Link} from 'react-router-dom'
import {options} from '../../options';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import RegistrationContext from '../../context/registration/registrationContext'


const ChooseEventModal = () =>{
	const registrationContext = useContext(RegistrationContext);
  console.log({registrationContext});
	const [show, setShow] = useState(false);
    const [active, setActive] = useState();
    

	
	const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
	const handleActive = (option, i) =>{
    setActive(i);
    registrationContext.setProduct(option);
 console.log({registrationContext})
    console.log(option.price);

        
    }

	return(

		<>

		<Button className="mr-2" variant="contained" style={{backgroundColor: "#8C0000", color:"white"}} onClick={handleShow}>
 Register
</Button>
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton> 
<Modal.Title>Registration
</Modal.Title> 
</Modal.Header>
<Modal.Body>
<ListGroup as="ul">
{ show && options.map((option, i) =>(
			<ListGroup.Item action as="li"  key={i} active={i === active} onClick={() => handleActive(option, i)} >
				{option.name}
                <p>
                    {option.descr} <br /> ${option.price}
                </p>

			</ListGroup.Item>))}
  </ListGroup>
  
  </Modal.Body>
  <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/user-registration" className="btn btn-primary" >
            Register
          </Link>
        </Modal.Footer>
  
</Modal>
</>
)

}

export default ChooseEventModal





