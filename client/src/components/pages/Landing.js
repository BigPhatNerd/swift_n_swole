import React, {useEffect, useContext, useState } from 'react';
import { Container, Row  } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ChooseEventModal from '../modals/ChooseEventModal';
import RegistrationContext from '../../context/registration/registrationContext';
import Scroll100 from '../scrollers/Scroll100';
import Scroll101 from '../scrollers/Scroll101';



const Landing = () => {
	const registrationContext = useContext(RegistrationContext);
const { loadUser, user, setAlert } = registrationContext;
const [option100, setOption100] = useState(false);
const [option101, setOption101] = useState(false); 
useEffect(() => {
	loadUser()
	
}, []);


return(
	<Container>
	<h3 onClick={()=> setOption100(!option100)}>Individual option in person</h3>
	{ option100 && <Scroll100 />}
	<h3 onClick={()=> setOption101(!option101)}>Partner option in person</h3>
	{ option101 && <Scroll101 />}
	<Row >
	<h1>Awesome landing page</h1>
	{!user.paid && user.isAuthenticated && <h2> You have not completed the payment portion of registration. </h2>}
	</Row>
	<Row>
<Link to='/login' className="btn btn-primary">Login</Link>
 

<ChooseEventModal/>
</Row>

	</Container>)
}

export default Landing;