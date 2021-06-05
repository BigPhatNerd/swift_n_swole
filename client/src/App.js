import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/src/collapse.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/MyNavbar'
import Routes from './components/routing/Routes'
import Landing from './components/pages/Landing'

import RegistrationState from './context/registration/RegistrationState'


function App() {

    return (

        <RegistrationState>
			<Router>
				<MyNavbar />
				
				{/*<Spinner />*/}
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route component={Routes} />
				
				</Switch>
			</Router>
		</RegistrationState>

    )
}

export default App