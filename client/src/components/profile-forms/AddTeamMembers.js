import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import background from '../../img/amanda_snatch.jpg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
        if(e.target.value === "enter-gender") return
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handlePhone = e => {
        setFormData({...formData, participantCellPhone: e})
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
  
    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
        <div id='team-members' style={styles.container}>
<Container className='pt-3'>
	<Row className="justify-content-center m-2">
		{(profile.eventId === 100 || profile.eventId === 102) ? <h1>Add Participant Info</h1> : <h1>Add Team Members</h1>}
	</Row>
	<Row className="justify-content-center m-2">
		{(profile.eventId === 100 || profile.eventId === 102) ? <p>Let's get some information about the participant</p> : <p>Let's get some information to assemble your team</p>}
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
    <Form.Control as='select'  onChange={e => onChange(e)}  value={participantGender} name="participantGender"  placeholder="Enter Gender">
   <option value="enter-gender">Enter Gender</option>
    <option value="male"> Male</option>
    <option value="female">Female</option>
    </Form.Control>
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
    <Form.Control as='select' onChange={e => onChange(e)}  value={participantState} name="participantState" type="participantState" placeholder="Enter Participant's State" >
<option value="">N/A</option>
            <option value="AK">Alaska</option>
            <option value="AL">Alabama</option>
            <option value="AR">Arkansas</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DC">District of Columbia</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="IA">Iowa</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="MA">Massachusetts</option>
            <option value="MD">Maryland</option>
            <option value="ME">Maine</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MO">Missouri</option>
            <option value="MS">Mississippi</option>
            <option value="MT">Montana</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="NE">Nebraska</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="PR">Puerto Rico</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VA">Virginia</option>
            <option value="VT">Vermont</option>
            <option value="WA">Washington</option>
            <option value="WI">Wisconsin</option>
            <option value="WV">West Virginia</option>
            <option value="WY">Wyoming</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicZip">
    <Form.Label>Zip</Form.Label>
    <Form.Control onChange={e => onChange(e)}  value={participantZip} name="participantZip" type="number" placeholder="Enter Participant's Zip" />
  </Form.Group>
  
  <Row className="text-left">
  <Col>
   <Form.Group controlId="formBasicDOB" >
          <Form.Label>DOB</Form.Label>
          <Form.Control type="date" onChange={e => onChange(e)} value={participantDOB} name="participantDOB" placeholder="Enter Participant's DOB" />
        </Form.Group>
  <Form.Group controlId="formBasicCellPhone" >
    <Form.Label >Cell Phone</Form.Label>
   
<PhoneInput country='us' onChange={e => handlePhone(e)}  value={participantCellPhone} name="participantCellPhone" type="participantCellPhone" placeholder="Enter Participant's Cell Phone"/>
   
  </Form.Group>
  </Col>
  </Row>
   
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