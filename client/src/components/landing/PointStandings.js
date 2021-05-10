import React, { useContext } from 'react';
import { Table, Row, Button } from  'react-bootstrap';

import RegistrationContext from '../../context/registration/registrationContext';

const PointStandings = ({ results }) => {
const registrationContext = useContext(RegistrationContext);
const { getCurrentProfile, profile, loading, user, deleteTeamMember } = registrationContext;
console.log({ results });
const standings = results.map(({_id, teamName, miles}, index) =>(

	 <tr key={_id}>
	 <td>{index + 1}</td>
      <td>{teamName}</td>
      <td>{0}</td>
      <td>{miles.total}</td>
  
  
    </tr>
    

	))
	return (
		
		<Table striped bordered size="sm" variant='dark' borderless>
  <thead>
    <tr>
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
