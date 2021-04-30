import React, { useContext } from 'react';
import { Table, Row, Button } from  'react-bootstrap';

import RegistrationContext from '../../context/registration/registrationContext';

const TeamMembers = () => {
const registrationContext = useContext(RegistrationContext);
const { getCurrentProfile, profile, loading, user, deleteTeamMember } = registrationContext;
const teamMembers = profile.team.map(({_id, participantName, participantEmail, participantGender, participantCity, participantState}, index) =>(

	 <tr key={_id}>
	 <td>{index + 1}</td>
      <td>{participantName}</td>
      <td>{participantEmail}</td>
      <td>{participantGender}</td>
  <td>{participantCity}</td>
  <td>{participantState}</td>
  <td>
   <Button style={{marginBottom: '.5rem', marginTop: '.2rem', backgroundColor: '#8C0000', border: 'none'}}onClick={() => deleteTeamMember(_id)}>Delete</Button>
   </td>
    </tr>
    

	))
	return (
		
		<Table striped bordered size="sm" variant='dark' borderless>
  <thead>
    <tr>
      <th>#</th>
      <th>Participant Name</th>
         <th>Email</th>
      <th>Gender</th>
      <th>City</th>
       <th>State</th>
       <th>Action</th>
    </tr>
  </thead>
  <tbody>
   {teamMembers}
     
  </tbody>
</Table>

		)

}

export default TeamMembers;
