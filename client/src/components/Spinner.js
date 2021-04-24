import React from 'react';
import spinner from '../img/lhrl_spinner.gif';

const Spinner = () => {
	return(
<>
<img src={spinner} alt="Loading..." style={{width: '100px', margin: 'auto', display:'block'}} />
</>
		)
}

export default Spinner;