import React from 'react';
import { Route, Redirect,Switch } from 'react-router-dom';
import RegisterOrSignup from '../pages/RegisterOrSignup'
import UserRegistration from '../pages/auth/UserRegistration'
import NotFound from '../pages/NotFound'
import Login from '../pages/auth/Login'
import Alert from '../Alert';


import Checkout from '../pages/Checkout';
import Dashboard from '../pages/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import PrivateRoute from '../routing/PrivateRoute';
import EditTeamName from '../profile-forms/EditTeamName';
import AddTeamMembers from '../profile-forms/AddTeamMembers';
import EnterScores from '../profile-forms/EnterScores';




const Routes = () =>{
return(
	<>
	<Alert />
	<Switch>
		<Route exact path="/register-or-signup" component={RegisterOrSignup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/user-registration" component={UserRegistration}/>
					<Route exact path="/checkout" component={Checkout}/>
					<Route  exact  path='/dashboard' component={Dashboard}/>
					<Route exact path='/create-team-profile' component={CreateProfile}/>
					<PrivateRoute exact path='/edit-team-name' component={EditTeamName} />
					<PrivateRoute exact path='/add-team-members' component={AddTeamMembers} />
					<PrivateRoute exact path='/enter-scores' component={EnterScores} />
					<Route component={NotFound} />
</Switch>
</>
)
}

export default Routes