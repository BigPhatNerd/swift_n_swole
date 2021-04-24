import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/MyNavbar'
import Landing from './components/pages/Landing'
import RegisterOrSignup from './components/pages/RegisterOrSignup'
import UserRegistration from './components/pages/auth/UserRegistration'
import NotFound from './components/pages/NotFound'
import Login from './components/pages/auth/Login'
import RegistrationState from './context/registration/RegistrationState'
import Alert from './components/Alert';
import Spinner from './components/Spinner';
import Checkout from './components/pages/Checkout';
import Dashboard from './components/pages/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';

function App() {
	return (
		<RegistrationState>
			<Router>
				<MyNavbar />
				<Alert />
				{/*<Spinner />*/}
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route
						exact
						path="/register-or-signup"
						component={RegisterOrSignup}
					/>
					<Route exact path="/login" component={Login} />
					<Route
						exact
						path="/user-registration"
						component={UserRegistration}
					/>
					<Route
						exact
						path="/checkout"
						component={Checkout}
					/>
					<Route 
					exact 
					path='/dashboard'
					component={Dashboard}
					/>
					<Route
					exact
					path='/create-team-profile'
					component={CreateProfile}
					/>
					<Route component={NotFound} />
				</Switch>
			</Router>
		</RegistrationState>
	)
}

export default App
