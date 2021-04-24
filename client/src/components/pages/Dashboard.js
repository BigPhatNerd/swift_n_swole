import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap';
import Spinner from '../Spinner';

import RegistrationContext from '../../context/registration/registrationContext';

const Dashboard = () =>{
const registrationContext = useContext(RegistrationContext);
const { getCurrentProfile, profile, loading, user } = registrationContext;

useEffect(() =>{
getCurrentProfile();
},[profile])


	return(
	loading && profile === null ?(
		<Spinner />): (
<Container>
	<Row>
		<h1>Dashboard</h1>
		
	</Row>
	<Row>
		<p>
			Welcome {user?.email}
		</p>
		</Row>
		{profile !== null ? (
<Row>Add a "TeamInfo" component here</Row>
			) : (
			<>
			<Row>
				<p>
					You have not setup a team profile, please add some info
				</p>
				</Row>
				
<Link to='/create-team-profile' className="btn btn-primary">Create Team Profile</Link>
			</>)}
	
</Container>
		)
		
		)
}

export default Dashboard;