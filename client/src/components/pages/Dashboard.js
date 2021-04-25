import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Spinner from '../Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import TeamMembers from '../dashboard/TeamMembers';
import RegistrationDescription from '../dashboard/RegistrationDescription';

import RegistrationContext from '../../context/registration/registrationContext';

const Dashboard = () =>{
const registrationContext = useContext(RegistrationContext);
const { getCurrentProfile, profile, loading, user } = registrationContext;

useEffect(() =>{
getCurrentProfile();
},[])
console.log("In Dashboard");
console.log({registrationContext})
	return( !user.isAuthenticated ? <Redirect to='/' /> :
	loading && profile === null ?(
		<Spinner />): (
<Container>
	{profile?.teamName !== "" && 
		
		<h1>Team: {profile?.teamName}</h1>
		}
		
		<p>
Welcome {user?.name} 
		</p>
		{profile !== null ? (
			<>
			<RegistrationDescription event={user.eventId}/>
			<TeamMembers />
			<DashboardActions />
</>
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