import React, { useContext } from 'react';
import RegistrationContext from '../context/registration/registrationContext';

const Alert = () => {
	const registrationContext = useContext(RegistrationContext);

	const { alert } = registrationContext;
	
	return (
		alert !== null && alert.length !== 0 && 
			
			alert.map((item, i) => (
				<div key={`alert-${i}`} style={{backgroundColor: 'blue', position: 'fixed', width: '100%', zIndex: 1, height: '2rem'}}>
{item.msg}
				</div>))
			
			
		)
}

export default Alert;