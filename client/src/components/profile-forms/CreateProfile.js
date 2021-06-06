import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form } from 'react-bootstrap';
import background from '../../img/dude_running.jpg';

import RegistrationContext from '../../context/registration/registrationContext';

const CreateProfile = ({history}) => {
	console.log("I USE THIS ONE!!")
	const registrationContext = useContext(RegistrationContext)
	console.log("CreateProfile");
	console.log({registrationContext});
	const { user } = registrationContext;

	const {
		createProfile,
		getCurrentProfile,
		profile,
		loading,
	} = registrationContext
	//Later add a place for team photo
	const [formData, setFormData] = useState({
		teamName: '',
		eventId: user.eventId
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
		//eslint-disable-next-line
	}, [])
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
console.log({profile})
	return loading && profile === null ? (
<Redirect to='/dashboard' />
		) : (
		<div style={styles.container}>
<Container className='pt-3'>
	<Row className="justify-content-center m-2">
		<h1>Create Your Profile</h1>
	</Row>
	<Row className="justify-content-center m-2">
		<p>Let's get some information to assemble your team</p>
	</Row>
	<Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formBasicTeamName">
    <Form.Label>Team Name</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={teamName} name="teamName" type="teamName" placeholder="Enter Team's Name" />
  </Form.Group>
 
  <Button className="m-2"variant="primary" type="submit">
    Submit
  </Button>
  </Form>
   <Link  to='/dashboard'>
         Go Back
        </Link>
</Container>
</div>
		)
		
}

export default CreateProfile
