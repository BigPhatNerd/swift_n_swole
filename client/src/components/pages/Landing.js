import React, {useEffect, useContext } from 'react';
import { Container, Row  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ChooseEventModal from '../modals/ChooseEventModal';
import RegistrationContext from '../../context/registration/registrationContext';


const Landing = () => {
	const registrationContext = useContext(RegistrationContext);
const { loadUser } = registrationContext;

useEffect(() =>{
	loadUser();
}, [])
return(
	<Container>
	<Row >
	<h1>Awesome landing page</h1>
	</Row>
	<Row>
<Link to='/login' className="btn btn-primary">Login</Link>
 

<ChooseEventModal/>
</Row>

	</Container>)
}

export default Landing;