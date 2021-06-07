import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form } from 'react-bootstrap';
import background from '../../img/gym_pic.jpg';

import RegistrationContext from '../../context/registration/registrationContext';

const EditTeamName = ({ history }) => {
    const registrationContext = useContext(RegistrationContext)
    console.log("CreateProfile");
    console.log({ registrationContext });

    const {
        createProfile,
        getCurrentProfile,
        profile,
        loading,
    } = registrationContext
    //Later add a place for team photo
    const [formData, setFormData] = useState({
        teamName: '',
        miles: profile.miles
    })
    useEffect(() => {
        getCurrentProfile()
        //eslint-disable-next-line
    }, [])
    useEffect(() => {
       
        setFormData({ teamName: loading || !profile.teamName ? '' : profile.teamName });
        //esling-disable-next-line
    }, [loading, profile])
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
    const { teamName } = formData
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, history, true)
    }


    console.log({ profile })
    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
        <div id='cover' style={styles.container}>
<Container>
	<Row className="justify-content-center mt-4 mb-2">
		<h1>Edit Your Team Name</h1>
	</Row>

	<Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formBasicTeamName">
    <Form.Label>Team Name</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={teamName} name="teamName" type="teamName" placeholder="Enter Team's Name" />
  </Form.Group>
  
  <Button variant="primary" type="submit">
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

export default EditTeamName