import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form, Accordion, Card } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import RegistrationContext from '../../context/registration/registrationContext';
import background from '../../img/rope.jpg';
const EnterScores = ({history}) => {
	const registrationContext = useContext(RegistrationContext)
	console.log("EnterScores");
	console.log({registrationContext});

	const {
		enterScore,
		getCurrentProfile,
		profile,
		loading,
		enterMiles
	} = registrationContext
	//Later add a place for team photo
	console.log({profile})
	const setArray = () => {
		const arr = []
		for (var i = 0; i < 12; i++){
			
const obj ={ 
			benchPress: loading || !profile?.reps[i]?.benchPress ? '' : profile.reps[i].benchPress,
			deadlift:  loading || !profile?.reps[i]?.deadlift ? '' :  profile.reps[i].deadlift
	};
	arr.push(obj)
		}
		
		return arr
	}
	const [formData, setFormData] = useState(setArray())
	

	const [mileageData, setMileageData] = useState({ total: 0 });

useEffect(() =>{
	getCurrentProfile();
	//eslint-disable-next-line
}, [])

	useEffect(() => {
		// getCurrentProfile()
		setFormData(setArray());
		setMileageData({ total: loading || !profile?.miles?.total ? '' : profile.miles.total})
		//eslint-disable-next-line
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


	const onChange = i => e => {
		
		
		let newArr = [...formData];
		newArr[i] = {...newArr[i],[e.target.name]: parseInt(e.target.value) };
	
		setFormData(newArr);
		
	}

	const onMileChange = e =>{
setMileageData({ ...mileageData, [e.target.name]: e.target.value })
console.log({mileageData})
	};
	const onMileageSubmit= e =>{
		e.preventDefault();
		document.querySelector(`#toggle-miles`).click();
		enterMiles(mileageData, history)
	}

	
	const onSubmit = (e, i) => {
		e.preventDefault()
		// createProfile(formData, history, true)

		console.log("e.target.getAttribute in onSubmit: ",e.target.getAttribute('data-hour'))
		const hour = parseInt(e.target.getAttribute('data-hour')) - 1;
		document.querySelector(`#toggle-${hour}`).click();
		enterScore(formData[hour], hour, history)

	}


const loopForm = () =>{
const hours = 8;
let content = []
	for( let i = 0; i < hours; i++){
		
	content.push(
	<>	
		
  <Accordion >
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id={`toggle-${i}`}>
       Hour {i+1} 
       { profile.reps[i].hasSubmitted && <CheckCircleIcon style={{float: 'right'}} /> }
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body><Form key={i+1} data-hour={i+1} onSubmit={e => onSubmit(e,i)}>
  <Form.Group controlId="formBasicBenchPress">
    <Form.Label>Bench Press</Form.Label>
    <Form.Control key={`bench${i}`}onChange={onChange(i)}  value={formData[i]?.benchPress} name="benchPress" type="number" placeholder="Enter Bench Press Reps" />
  </Form.Group>
  <Form.Group controlId="formBasicDeadlift">
    <Form.Label>Deadlift</Form.Label>
    <Form.Control key={`dead${i}`}onChange={onChange(i)}  value={formData[i]?.deadlift} name="deadlift" type="text" placeholder="Enter Deadlift Reps" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit Hour {i + 1}
  </Button>
  </Form></Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>
  <br />
  </>
  )

	}
	return content
}
	
console.log({profile})
	return loading && profile === null ? (
<Redirect to='/dashboard' />
		) : (
		<div id='cover' style={styles.container}>
<Container>
<>
	<Row className="justify-content-center m-4">
		<h1>Enter Your Scores</h1>
	</Row>
	
	<Accordion >
  <Card>
    <Card.Header >
      <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id={`toggle-miles`}>
       { profile.miles.hasSubmitted ? <>
       	<p>Total Mileage: {profile.miles.total} miles</p>
       	<CheckCircleIcon style={{float: 'right'}} /> 
       	</> : <p>Enter Mileage</p>}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body><Form key={0} data-hour={0} onSubmit={e => onMileageSubmit(e)}>
  <Form.Group controlId="formBasicMiles">
    <Form.Label>Total Miles</Form.Label>
    <Form.Control key={`miles`} onChange={e => onMileChange(e)}  value={mileageData?.total} name="total" type="number" placeholder="Enter Total Miles" />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit Mileage 
  </Button>
  </Form></Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>
  <br />
	</>

{loopForm()}

   <Link  to='/dashboard'>
         Go Back
        </Link>
</Container>
</div>
		)
		
}

export default EnterScores
