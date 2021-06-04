import React, {useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegistrationContext from '../context/registration/registrationContext';


const MyNavbar = () =>{
  const registrationContext = useContext(RegistrationContext);
  const { logout, user } = registrationContext;
  console.log("MyNavbar.js");
  console.log({registrationContext})

  return(
<Navbar className="color-nav" expand="lg">
  <Navbar.Brand color='light'as={Link} to="/">Swift & Swole</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
  { !user.isAuthenticated &&   <Nav.Link as={Link} to="/login">Login</Nav.Link> }
      <Nav.Link as={Link} to="/login" onClick={logout}>Logout</Nav.Link>
   { user.isAuthenticated && user.paid &&  <Nav.Link as={Link} to="/dashboard" >Dashboard</Nav.Link> }
     
     
    </Nav>
   
     
  
  </Navbar.Collapse>
</Navbar>
)
}

export default MyNavbar;