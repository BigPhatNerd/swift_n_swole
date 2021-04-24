import React from 'react';
import { Container, Row  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ChooseEventModal from '../modals/ChooseEventModal';



const Landing = () => {
	
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