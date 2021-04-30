import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col,  Button, Form } from 'react-bootstrap';

import RegistrationContext from '../../../context/registration/registrationContext';
const UserRegistration = () =>{


const registrationContext = useContext(RegistrationContext);
const { product, user, setProduct, register, setAlert, setEmail, setName } = registrationContext;

const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: ''
})
const { firstName, lastName, email, password, password2 } = formData;
console.log("UserRegistration")
console.log({registrationContext})
const onChange = e =>{
 
  setFormData({...formData, [e.target.name]: e.target.value })
 
 
}

const onSubmit = e =>{
  e.preventDefault();

  if (password !== password2){
   setAlert('Passwords do not match', 'dark');
  } else {
setEmail(email);
setName(firstName + " " + lastName)
register({firstName, lastName, email, password});

  }
}
console.log({registrationContext});
if (user.isAuthenticated) return (
  <Redirect to="/checkout" />)
	return(
    <Container>
  <Col>
		<Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={firstName} name="firstName" type="firstName" placeholder="Enter first name" />
  </Form.Group>
  <Form.Group controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={lastName} name="lastName" type="lastName" placeholder="Enter last name" />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={email} name="email" type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={password} name="password" type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword2">
    <Form.Label>Re-enter Password</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={password2} name="password2" type="password" placeholder="Password confirmation" />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Col>
</Container>
		)
}

export default UserRegistration;