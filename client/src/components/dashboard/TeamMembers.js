import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';

import RegistrationContext from '../../context/registration/registrationContext';

const TeamMembers = () => {

    const registrationContext = useContext(RegistrationContext);
    const { profile, deleteTeamMember } = registrationContext;
    const teamMembers = profile.team.map(({ _id, participantName, participantEmail, participantGender, participantCity, participantState }, index) => (

        <tr className="align-content-center" key={_id}>
   <td>{index + 1}</td>
      <td>{participantName}</td>
      <td>{participantEmail}</td>
      <td>{participantGender}</td>
  <td>{participantCity}</td>
  <td>{participantState}</td>
  <td>
  <p id="delete-text" onClick={() => deleteTeamMember(_id)}>Delete</p>
  
   </td>
    </tr>


    ))
    return (

        <Table striped bordered size="sm" variant='dark' borderless >
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