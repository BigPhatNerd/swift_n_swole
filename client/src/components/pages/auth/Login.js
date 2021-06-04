import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RegistrationContext from '../../../context/registration/registrationContext';
import { Container, Col,  Row, Button, Form } from 'react-bootstrap';
import background from '../../../img/girl_pushpress.jpg';

const Login = () => {
	const registrationContext = useContext(RegistrationContext);
	const { user, login, setAlert } = registrationContext;
	const [formData, setFormData] = useState({
  email: '',  
  password: '',
})
  const styles = {
    container: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },
   
};
const { email, password, } = formData;
const onChange = e =>{
  setFormData({...formData, [e.target.name]: e.target.value })
}
console.log("In Login");
console.log({registrationContext})
const onSubmit = e =>{
  e.preventDefault();
  if(email === '' || password === ''){
  	setAlert('Please fill in all fields', 'danger');
  }
  else {
  login(email, password)
}

  }
  if(user.isAuthenticated){
  	return <Redirect to='/dashboard' />;
  }

	return(
    <div  style={styles.container}>
		<Container className='pt-3'>
			<Row className="justify-content-center m-2">
				<h1>Sign In </h1>
			</Row>
		
			<Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formBasicFirstName">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={email} name="email" type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formBasicLastName">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={password} name="password" type="password" placeholder="Enter password" />
  </Form.Group>
<Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<Row className="ml-2 mt-2">
	<p>Don't have an account?&nbsp; <Link to='/'>Register from homepage</Link></p>
</Row>
		</Container>
    </div>)
}

export default Login;