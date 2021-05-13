import React, { useContext, useState } from 'react';
import { Table, Row, Button } from  'react-bootstrap';




import RegistrationContext from '../../context/registration/registrationContext';

const PointStandings = ({ results }) => {
const registrationContext = useContext(RegistrationContext);
const { getCurrentProfile, profile, loading, user, deleteTeamMember } = registrationContext;
const [finger, setFinger] = useState(true)
const fingerPoint = () =>{
setFinger(!finger)
}
const standings = results.map((result, index) =>(
<>
	 <tr onClick={fingerPoint} key={result._id}
   data-toggle="collapse"
                        data-target=".multi-collapse1"
                        aria-controls="multiCollapseExample1"
                        >
                        <td>{finger ? '👉' : '👇'}</td>
	 <td>{index + 1}</td>
      <td>{result.teamName}</td>
      <td>{0}</td>
      <td>{result.miles.total}</td>
  
  
    </tr>
  
<Table striped bordered size="sm" variant='dark'  borderless hover className="collapse multi-collapse1" id="multiCollapseExample1">
  <thead>
    <tr key="team">
      
      <th>Name</th>
      <th>City</th>
      <th>State</th>
    </tr>
  </thead>
  <tbody>

{ result.team.map((person, i) =>{
  return(  <tr key={"team-" + i}>
     
      <td>{person.participantName}</td>
      <td>{person.participantCity}</td>
      <td>{person.participantState}</td>
    </tr>)
   })
    }
  </tbody>
</Table>
                            
                        
    </>

	))
	return (
		
		<Table striped bordered size="sm" variant='dark' borderless hover >
  <thead>
    <tr key='total-score'>
    <th>Team Member</th>
      <th>Rank</th>
      <th>Team Name</th>
         <th>Total Score</th>
      <th>Total Miles</th>
      
    </tr>
  </thead>
  <tbody>
   {standings}
     
  </tbody>
</Table>

		)

}

export default PointStandings;
