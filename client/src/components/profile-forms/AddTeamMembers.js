import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form } from 'react-bootstrap';
import background from '../../img/amanda_snatch.jpg';

import RegistrationContext from '../../context/registration/registrationContext';

const AddTeamMembers = ({ history }) => {
    const registrationContext = useContext(RegistrationContext)
    console.log("AddTeamMemberse");
    console.log({ registrationContext });

    const {
        getCurrentProfile,
        profile,
        loading,
        addTeamMembers
    } = registrationContext
    //Later add a place for team photo
    const [formData, setFormData] = useState({
        participantName: '',
        participantGender: '',
        participantCellPhone: '',
        participantAddress: '',
        participantCity: '',
        participantState: '',
        participantZip: '',
        participantEmail: '',
        participantDOB: '',

    })
    const {
        participantName,
        participantGender,
        participantCellPhone,
        participantAddress,
        participantCity,
        participantState,
        participantZip,
        participantEmail,
        participantDOB
    } = formData
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault()
        addTeamMembers(formData, history)
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
    console.log({ profile })
    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
        <div id='team-members' style={styles.container}>
<Container className='pt-3'>
	<Row className="justify-content-center m-2">
		<h1>Add Team Members</h1>
	</Row>
	<Row className="justify-content-center m-2">
		<p>Let's get some information to assemble your team</p>
	</Row>
	<Form onSubmit={e => onSubmit(e)}>
  <Form.Group controlId="formBasicParticipant">
    <Form.Label>Name</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantName} name="participantName" type="name" placeholder="Enter Participant's Name" />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantEmail} name="participantEmail" type="email" placeholder="Enter Participant's Email" />
  </Form.Group>
  <Form.Group controlId="formBasicGender">
    <Form.Label>Gender</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantGender} name="participantGender" type="participantGender" placeholder="Enter Gender" />
  </Form.Group>
  <Form.Group controlId="formBasicCellPhone">
    <Form.Label>Cell Phone</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantCellPhone} name="participantCellPhone" type="participantCellPhone" placeholder="Enter Participant's Cell Phone" />
  </Form.Group>
  <Form.Group controlId="formBasicAddress">
    <Form.Label>Address</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantAddress} name="participantAddress" type="participantAddress" placeholder="Enter Participant's Address" />
  </Form.Group>
  <Form.Group controlId="formBasicCity">
    <Form.Label>City</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantCity} name="participantCity" type="participantCity" placeholder="Enter Participant's City" />
  </Form.Group>
  <Form.Group controlId="formBasicState">
    <Form.Label>State</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantState} name="participantState" type="participantState" placeholder="Enter Participant's State" />
  </Form.Group>
  <Form.Group controlId="formBasicZip">
    <Form.Label>Zip</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantZip} name="participantZip" type="participantState" placeholder="Enter Participant's Zip" />
  </Form.Group>
  
  <Form.Group controlId="formBasicDOB">
    <Form.Label>DOB</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantDOB} name="participantDOB" type="participantDOB" placeholder="Enter Participant's DOB" />
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

export default AddTeamMembers