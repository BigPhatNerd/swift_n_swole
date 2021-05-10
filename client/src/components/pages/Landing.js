import React, {useEffect, useContext, useState } from 'react';
import { Container, Row  } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ChooseEventModal from '../modals/ChooseEventModal';
import RegistrationContext from '../../context/registration/registrationContext';
import Scroll from '../landing/Scroll';
import axios from 'axios';
import PointStandings from '../landing/PointStandings';



const Landing = () => {
	const registrationContext = useContext(RegistrationContext);
	console.log("Landing");
	console.log({registrationContext});
const { loadUser, user, setAlert } = registrationContext;
//hide or show scrolling tickers
const [option100, setOption100] = useState(false);
const [option101, setOption101] = useState(false);
const [option102, setOption102] = useState(false);
const [option103, setOption103] = useState(false);
const [option104, setOption104] = useState(false);
const [option105, setOption105] = useState(false);

//set what message scrolls
const [message100, setMessage100] = useState([]);
const [message101, setMessage101] = useState([]);
const [message102, setMessage102] = useState([]);
const [message103, setMessage103] = useState([]);
const [message104, setMessage104] = useState([]);
const [message105, setMessage105] = useState([]);

const [results, setResults] = useState([]);
	

	useEffect(() => {
		loadUser()
		async function getAll() {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			const allScores = await axios.get('/api/profile/all', config)
			console.log('allScores.data: ', allScores.data)
			setResults(allScores.data)
			var arr100 = [], arr101=[], arr102=[], arr103=[], arr104=[], arr105=[];
			allScores.data.map((result, index) => {
				if(result.eventId === 100){
				arr100.push(`TeamName: ${result.teamName} has ${result.miles.total} total miles`)
			} else if(result.eventId === 101){
				arr101.push(`TeamName: ${result.teamName} has ${result.miles.total} total miles`)
			} else if(result.eventId === 102){
				arr102.push(`TeamName: ${result.teamName} has ${result.miles.total} total miles`)
			}
			})
			setMessage100(arr100);
			setMessage101(arr101);
			setMessage102(arr102);
			setMessage103(arr103);
			setMessage104(arr104);
			setMessage105(arr105);
		}
		getAll()
	}, [])



return(
	<Container>
	<h3 onClick={()=> setOption100(!option100)}>Individual option in person</h3>
	{ option100 && <>
		
		<Scroll results={results} message={message100} /> 
		<PointStandings results={results} />
		</>
	}
	<h3 onClick={()=> setOption101(!option101)}>Partner option in person</h3>
	{ option101 && <Scroll results={results} message={message101} />}
	<h3 onClick={()=> setOption102(!option102)}>Individual option virtual</h3>
	{ option102 && <Scroll results={results} message={message102} />}
	<h3 onClick={()=> setOption103(!option103)}>Partner option virtual</h3>
	{ option103 && <Scroll results={results} message={message103} />}
	<h3 onClick={()=> setOption104(!option104)}>Team option virtual</h3>
	{ option104 && <Scroll results={results} message={message104} />}
	<h3 onClick={()=> setOption105(!option105)}>Team option in person</h3>
	{ option105 && <Scroll results={results} message={message105} />}
	
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