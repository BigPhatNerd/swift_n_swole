import React, {useEffect, useContext } from 'react';
import { Container, Row  } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ChooseEventModal from '../modals/ChooseEventModal';
import RegistrationContext from '../../context/registration/registrationContext';


const Landing = () => {
	const registrationContext = useContext(RegistrationContext);
const { loadUser, user, setAlert } = registrationContext;


return(
	<Container>
	<Row >
	<h1>Awesome landing page</h1>
	{!user.paid && <h2> You have not completed the payment portion of registration. </h2>}
	</Row>
	<Row>
<Link to='/login' className="btn btn-primary">Login</Link>
 

<ChooseEventModal/>
</Row>

	</Container>)
}

export default Landing;