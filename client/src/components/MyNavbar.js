import React, {useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegistrationContext from '../context/registration/registrationContext';


const MyNavbar = () =>{
  const registrationContext = useContext(RegistrationContext);
  const { logout } = registrationContext;

  return(
<Navbar className="color-nav" expand="lg">
  <Navbar.Brand color='light'as={Link} to="/">Swift and Swole</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="#home">Participants</Nav.Link>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
      <Nav.Link as={Link} to="/login" onClick={logout}>Logout</Nav.Link>
      <Nav.Link as={Link} to="/dashboard" >Dashboard</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
     
    </Nav>
   
     
  
  </Navbar.Collapse>
</Navbar>
)
}

export default MyNavbar;