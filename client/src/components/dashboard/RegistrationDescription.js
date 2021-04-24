import React from 'react';
import {  Container, Row } from 'react-bootstrap'


const RegistrationDescription = ({event}) => {
	const whichEvent = (event) =>{
		if(event === 100) {
			return(
				<Row>
					<p><strong>Registered for the in-person, individual event. Please add yourself as a member.</strong></p>
				</Row>)
		} else if(event === 101){
		return(<Row>
					<p><strong>Registered for the in-person, partner event. Please add yourself and your teammate as members.</strong></p>
				</Row>)	
		} else if(event === 102) {
return(<Row>
					<p><strong>Registered for the virtual, individual event. Please add yourself as a member.</strong></p>
				</Row>)	
		} else if(event === 103){
			return(<Row>
					<p><strong>Registered for the virtual, partner event. Please add yourself and your teammate as members.</strong></p>
				</Row>)	
		} else if(event === 104){
			return(<Row>
					<p><strong>Registered for the virtual, team event. Please add yourself and your teammates as members.</strong></p>
				</Row>)	
		} else if(event === 105){
			return(<Row>
					<p><strong>Registered for the in-person, team event. Please add yourself and your teammates as members.</strong></p>
				</Row>)	
		}
	}
	return (
		<Container>
		{whichEvent(event)}
		</Container>
		)
	}


export default RegistrationDescription;