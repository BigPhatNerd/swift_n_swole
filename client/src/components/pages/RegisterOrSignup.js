import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row,  Button } from 'react-bootstrap';

const RegisterOrSignup = () => {
	return (
		<Container>
		<h1>Register</h1>
		<Row className="border border-dark">
		<Col xs={12} md={6}>
		
		<h2>Don't have an account?</h2>
		<Link to='/user-registration' className="btn btn-primary">Let's get you signed up.</Link>
		

		</Col>
		<Col xs>
			<h2>Already have an account?</h2>
			<Button>Sign in</Button>
		</Col>
		</Row>
		</Container>)
}

export default RegisterOrSignup