import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterOrSignup from '../pages/RegisterOrSignup'
import UserRegistration from '../pages/auth/UserRegistration'
import NotFound from '../pages/NotFound'
import Login from '../pages/auth/Login'
import Alert from '../Alert';

import MoreInfo from '../pages/MoreInfo';
import AboutUs from '../pages/AboutUs';


import Checkout from '../pages/Checkout';
import Dashboard from '../pages/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import PrivateRoute from '../routing/PrivateRoute';
import EditTeamName from '../profile-forms/EditTeamName';
import AddTeamMembers from '../profile-forms/AddTeamMembers';
import EnterScores from '../profile-forms/EnterScores';
import BookDyno from '../pages/BookDyno';
import HowItWorks from '../pages/HowItWorks';




const Routes = () => {
	return (
		<>
			<Alert />
			<Switch>
				<Route exact path="/register-or-signup" component={RegisterOrSignup} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/user-registration" component={UserRegistration} />
				<Route exact path="/checkout" component={Checkout} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/create-team-profile' component={CreateProfile} />
				<Route exact path='/more-info' component={MoreInfo} />
				<Route exact path='/book-dyno' component={BookDyno} />
				<Route exact path='/how-it-works' component={HowItWorks} />
				<Route exact path='/about-us' component={AboutUs} />
				<PrivateRoute exact path='/edit-team-name' component={EditTeamName} />
				<PrivateRoute exact path='/add-team-members' component={AddTeamMembers} />
				<PrivateRoute exact path='/enter-scores' component={EnterScores} />
				<Route component={NotFound} />
			</Switch>
		</>
	)
}

export default Routes