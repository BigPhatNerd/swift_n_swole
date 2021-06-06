import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import RegistrationContext from '../../context/registration/registrationContext';
const DashboardActions = () => {
    const registrationContext = useContext(RegistrationContext);
    const { profile } = registrationContext;
    const { eventId, team } = profile;
    return (
        <Container>
			<Row className="justify-content-center m-2">
				<Link to="/edit-team-name" className="btn btn-primary m-2">
					Edit Team Name
				</Link>

			{ ((eventId === 100 && team.length < 1) || (eventId === 101 && team.length <2) || (eventId === 102 && team.length <1) || (eventId === 103 && team.length <2) || (eventId === 104 && team.length < 4) || (eventId === 105 && team.length < 4)) && <Link to="/add-team-members" className="btn btn-primary m-2">
					Add Members
				</Link>  }
				<Link to="/enter-scores" className="btn btn-primary m-2">
					Enter Scores
				</Link>
			</Row>
			</Container>

    )
}

export default DashboardActions