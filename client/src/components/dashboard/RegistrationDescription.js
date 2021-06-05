import React, { useContext }from 'react';
import { Container, Row } from 'react-bootstrap'
import RegistrationContext from '../../context/registration/registrationContext';

const RegistrationDescription = ({ event }) => {
	const registrationContext = useContext(RegistrationContext);
	const {profile} = registrationContext;
	const {team} = profile;
	console.log("Registration description");
	console.log({ registrationContext });
    const whichEvent = (event) => {
        if(event === 100) {
            return (
            	<>
                <Row className="justify-content-center m-2">
					<p><strong>Registered for the in-person, individual event. </strong></p>
				</Row>
				{ team.length < 1 && <Row className="justify-content-center m-2">
					<p><strong>Please add yourself as a participant.</strong></p>
				</Row>}
				</>)
        } else if(event === 101) {
            return (
            	<>
            	<Row className="justify-content-center m-2">
					<p><strong>Registered for the in-person, partner event. </strong></p>
				</Row>
				{ team.length < 2 && <Row className="justify-content-center m-2">
					<p><strong>Please register participants (including yourself).</strong></p>
				</Row>}
				</>)
        } else if(event === 102) {
            return (
            	<>
            	<Row className="justify-content-center m-2">
					<p><strong>Registered for the virtual, individual event. </strong></p>
				</Row>
				{ team.length < 1 && <Row className="justify-content-center m-2">
					<p><strong>Please add yourself as a participant.</strong></p>
				</Row>}
				</>)
        } else if(event === 103) {
            return (
<>
            	<Row className="justify-content-center m-2">
					<p><strong>Registered for the virtual, partner event. </strong></p>
				</Row>
				{ team.length < 2 && <Row className="justify-content-center m-2">
					<p><strong>Please register participants (including yourself).</strong></p>
				</Row>}
				</>)
        } else if(event === 104) {
            return (
<>
            	<Row className="justify-content-center m-2">
					<p><strong>Registered for the virtual, team event. </strong></p>
				</Row>
				{ team.length < 4 && <Row className="justify-content-center m-2">
					<p><strong>Please register all participants (including yourself).</strong></p>
				</Row>}
				</>)
        } else if(event === 105) {
            return (
            	<>
            	<Row className="justify-content-center m-2">
					<p><strong>Registered for the in-person, team event.</strong></p>
				</Row>
				{ team.length < 4 && <Row className="justify-content-center m-2">
					<p><strong>Please register all participants (including yourself).</strong></p>
				</Row>}
				</>)
        }
    }
    return (
        <Container>
		{whichEvent(event)}
		</Container>
    )
}


export default RegistrationDescription;