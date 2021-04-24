import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form } from 'react-bootstrap';

import RegistrationContext from '../../context/registration/registrationContext';

const Profile = ({history}) => {
	const registrationContext = useContext(RegistrationContext)
	const {
		createProfile,
		getCurrentProfile,
		profile,
		loading,
	} = registrationContext
	//Later add a place for team photo
	const [formData, setFormData] = useState({
		teamName: '',
	})
	const { teamName } = formData
	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {
		e.preventDefault()
		createProfile(formData, history)
	}

	useEffect(() => {
		getCurrentProfile()
	}, [profile])
console.log({profile})
	return loading && profile === null ? (
<Redirect to='/dashboard' />
		) : (
<Container>
	<Row>
		<h1>Create Your Profile</h1>
	</Row>
	<Row>
		<p>Let's get some information to assemble your team</p>
	</Row>
	<Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formBasicTeamName">
    <Form.Label>Team Name</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={teamName} name="teamName" type="teamName" placeholder="Enter Team's Name" />
  </Form.Group>
   <Form.Group controlId="formBasicTeamName">
    <Form.Label>Upload Team Image</Form.Label>
    
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Form>
   <Link  to='/dashboard'>
         Go Back
        </Link>
</Container>
		)
		
}

export default Profile
