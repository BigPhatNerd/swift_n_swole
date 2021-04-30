import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form, Accordion, Card } from 'react-bootstrap';

import RegistrationContext from '../../context/registration/registrationContext';

const EnterScores = ({history}) => {
	const registrationContext = useContext(RegistrationContext)
	console.log("EnterScores");
	console.log({registrationContext});

	const {
		enterScore,
		getCurrentProfile,
		profile,
		loading,
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
	const [hourOne, setHourOne] = useState(false);

	useEffect(() => {
		getCurrentProfile()
		setFormData(setArray())
	}, [loading])
	const { benchPress, deadlift } = formData
	
	const onChange = i => e => {
		console.log({i});
		console.log("e.target.name: ", e.target.name);
		const thing = e.target.name
		let newArr = [...formData];
		newArr[i] = {...newArr[i],[e.target.name]: parseInt(e.target.value) };
		console.log("newArr[index]: ", newArr[i]);
		console.log("e.target.value: ", e.target.value);
		setFormData(newArr);
		console.log({newArr})
		console.log({formData})
	}

	
	const onSubmit = (e) => {
		e.preventDefault()
		// createProfile(formData, history, true)

		console.log("e.target.getAttribute in onSubmit: ",e.target.getAttribute('data-hour'))
		const hour = parseInt(e.target.getAttribute('data-hour')) - 1;
		enterScore(formData[hour], hour, history)

	}

const loopForm = () =>{
const hours = 8;
let content = []
	for( var i = 0; i < hours; i++){
		
	content.push(
	<>	
		
  <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
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
  </>
  )

	}
	return content
}
	
console.log({profile})
	return loading && profile === null ? (
<Redirect to='/dashboard' />
		) : (
<Container>
<>
	<Row>
		<h1>Enter Your Scores</h1>
	</Row>
	<Row>
		<p>blahh</p>
	</Row>
	</>

{loopForm()}

   <Link  to='/dashboard'>
         Go Back
        </Link>
</Container>
		)
		
}

export default EnterScores
