import React, {useEffect, useContext, useState } from 'react';
import { Container, Row, Accordion, Card  } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ChooseEventModal from '../modals/ChooseEventModal';
import RegistrationContext from '../../context/registration/registrationContext';
import Scroll from '../landing/Scroll';
import axios from 'axios';
import PointStandings from '../landing/PointStandings';
import StandingsMaterialUI from '../landing/StandingsMaterialUI';
import Grid from '@material-ui/core/Grid';
import background from '../../img/darkened_weights.jpg';




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

//Set what score table data gets displayed
const [result100, setResult100] = useState([]);
const [result101, setResult101] = useState([]);
const [result102, setResult102] = useState([]);
const [result103, setResult103] = useState([]);
const [result104, setResult104] = useState([]);
const [result105, setResult105] = useState([]);

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
			var arr100 = [], arr101=[], arr102=[], arr103=[], arr104=[], arr105=[], resArr100=[], resArr101 =[], resArr102=[], resArr103=[], resArr104=[], resArr105=[];
			var place100 = 1;
			var place101 = 1;
			var place102 = 1;
			var place103 = 1;
			var place104 = 1;
			var place105 = 1;
			
			allScores.data.map((result, index) => {
				if(result.eventId === 100){
				arr100.push(`${place100}. ${result.teamName} has ${result.miles.total} total miles \xa0\xa0\xa0\xa0\xa0\xa0\xa0`);
				resArr100.push(result)
				place100++;
			} else if(result.eventId === 101){
				arr101.push(`${place101}. ${result.teamName} has ${result.miles.total} total miles\xa0\xa0\xa0\xa0\xa0\xa0\xa0`);
				resArr101.push(result);
				place101++
			} else if(result.eventId === 102){
				arr102.push(`${place102}. ${result.teamName} has ${result.miles.total} total miles\xa0\xa0\xa0\xa0\xa0\xa0\xa0`);
				resArr102.push(result);
				place102++;
			} else if(result.eventId === 103){
				arr103.push(`${place103}. ${result.teamName} has ${result.miles.total} total miles\xa0\xa0\xa0\xa0\xa0\xa0\xa0`);
				resArr103.push(result);
				place103++;
			} else if(result.eventId === 104){
				arr104.push(`${place104}. ${result.teamName} has ${result.miles.total} total miles\xa0\xa0\xa0\xa0\xa0\xa0\xa0`);
				resArr104.push(result);
				place104++;
			} else if(result.eventId === 105){
				arr105.push(`${place105}. ${result.teamName} has ${result.miles.total} total miles\xa0\xa0\xa0\xa0\xa0\xa0\xa0`);
				resArr105.push(result);
				place105++;
			}
			})
			setMessage100(arr100);
			setMessage101(arr101);
			setMessage102(arr102);
			setMessage103(arr103);
			setMessage104(arr104);
			setMessage105(arr105);

			setResult100(resArr100);
			setResult101(resArr101);
			setResult102(resArr102);
			setResult103(resArr103);
			setResult104(resArr104);
			setResult105(resArr105);

		}
		getAll()
	}, [])

const styles = {
    container: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },
   
};

return(
	<div id='cover' style={styles.container}>
	<Container className='pt-3'>
	
	
	<Row className="justify-content-center m-2">
	<h1>2021 Swift & Swole</h1>
	{!user.paid && user.isAuthenticated && <h2> You have not completed the payment portion of registration. </h2>}
	</Row>
	<Row className="justify-content-center m-2">
<Link to='/login' className="btn btn-primary">Login</Link>
 

<ChooseEventModal/>
</Row>
<br />
<Accordion >
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id={`toggle-0`}>
       Point Standings
    
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
     
      	<p onClick={()=> setOption100(!option100)} style={{letterSpacing: '1px'}}>{option100 ? "👇 Individuals 👇" : "👉 Individuals 👈"}</p>
	{ option100 && <>	
		<Scroll results={results} message={message100} /> 	
		<StandingsMaterialUI results={result100}/>
	
		</>
	}
	<p onClick={()=> setOption101(!option101)} style={{letterSpacing: '2px'}}>{option101 ? "👇 Partners 👇" : "👉 Partners 👈"}</p>
	{ option101 && <> 
		<Scroll results={results} message={message101} />
		
		<StandingsMaterialUI results={result101}/>
	</>}
	<p onClick={()=> setOption105(!option105)} style={{letterSpacing: '4px'}}>{option105 ? "👇 Teams 👇" : "👉  Teams  👈"}</p>
	{ option105 && <> 
		<Scroll results={results} message={message105} />
		
		<StandingsMaterialUI results={result105}/>
	</>}
	<p onClick={()=> setOption102(!option102)} style={{letterSpacing: '1px'}}>{option102 ? "👇 Individual (virtual) 👇" : "👉 Individual (virtual) 👈"}</p>
	{ option102 && <> 
		<Scroll results={results} message={message102} />
		
		<StandingsMaterialUI results={result102}/>
	</>}
	<p onClick={()=> setOption103(!option103)} style={{letterSpacing: '2px'}}>{option103 ? "👇 Partner (virtual) 👇" : "👉 Partner (virtual) 👈"}</p>
	{ option103 && <> 
		<Scroll results={results} message={message103} />
		
		<StandingsMaterialUI results={result103}/>
	</>}
	<p onClick={()=> setOption104(!option104)} style={{letterSpacing: '3px'}}>{option104 ? "👇 Team (virtual) 👇" : "👉 Team (virtual) 👈"}</p>
	{ option104 && <> 
		<Scroll results={results} message={message104} />
		
		<StandingsMaterialUI results={result104}/>
	</>}
	
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>

	</Container>
	</div>)
}

export default Landing;