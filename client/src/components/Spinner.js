import React from 'react';
import spinner from '../img/lhrl_spinner.gif';


const Spinner = () => {
	return(
<>
<img src={spinner} alt="Loading..." style={{width: '40px', margin: 'auto', display:'block', marginBottom: "1rem"}} />
</>
		)
}

export default Spinner;