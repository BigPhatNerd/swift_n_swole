import React, { useReducer } from 'react'

import RegistrationContext from './registrationContext'
import RegistrationReducer from './registrationReducer'
import axios from 'axios'
import uuid from 'uuid/v4'

import {
	SET_SELECTED_PRODUCT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	SET_LOADING,
	SET_ALERT,
	REMOVE_ALERT,
	SET_EMAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	SET_NAME
} from '../types'

import setAuthToken from '../../utils/setAuthToken'

const RegistrationState = props => {
	const initialState = {
		product: {},
		user: {
			isAuthenticated: false,
			email: '',
			name: '',
			eventId: '',
			paid: false

		},
		loading: true,
		alert: [],
		profile: null,
		error: {}
	}
	

	const [state, dispatch] = useReducer(RegistrationReducer, initialState)

// Enter Scores by the hour
const enterScore = async (formData, hour, history) => {
	window.scrollTo(0,0);
	try {
			const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   
    const res = await axios.put(`/api/profile/add-score/${hour}`, formData, config);
    console.log("res.data: ", res.data);
    console.log({formData})
    dispatch({
    	type: UPDATE_PROFILE,
    	payload: res.data
    })
    setAlert('Reps Added Successfully', 'success');
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors) {
			errors.forEach(error => setAlert(error.msg, 'danger'))
		}
		console.error({err});
	dispatch({
		type: PROFILE_ERROR,
		payload: { msg: err.response.statusText, status: err.response.status }
	})
	}
}

//Enter mileage
const enterMiles = async (miles, history) => {
	try {
		window.scrollTo(0,0);
			const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   
    const res = await axios.put(`/api/profile/add-miles`, miles, config);
    console.log("res.data: ", res.data);
 
    dispatch({
    	type: UPDATE_PROFILE,
    	payload: res.data
    })
    setAlert('Miles Added Successfully', 'success');
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors) {
			errors.forEach(error => setAlert(error.msg, 'danger'))
		}
		console.error({err});
	dispatch({
		type: PROFILE_ERROR,
		payload: { msg: err.response.statusText, status: err.response.status }
	})
	}
}



//Add Team Members to profile
const addTeamMembers = async (formData, history) => {
	try {
		window.scrollTo(0,0);
		const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/team-member', formData, config);
    dispatch({
    	type: UPDATE_PROFILE,
    	payload: res.data
    })
    setAlert('Team Member Added', 'success');
    history.push('/dashboard');
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors) {
			errors.forEach(error => setAlert(error.msg, 'danger'))
		}
		console.error({err});
	dispatch({
		type: PROFILE_ERROR,
		payload: { msg: err.response.statusText, status: err.response.status }
	})
		
	}
}

//Delete Team Member
const deleteTeamMember = async (id) => {
try {
	const res = await axios.delete(`/api/profile/team-member/${id}`);

	dispatch({
		type: UPDATE_PROFILE,
		payload: res.data
	});
	setAlert('Team Member Removed', 'success');
} catch(err) {
		console.log({err})
			const errors = err.response.data.errors
			if(errors) {
			errors.forEach(error => setAlert(error.msg, 'danger'))
		}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.StatusText,
					status: err.response.status,
				},
			})
}
}

	//Create or update profile
	const createProfile = async (formData, history, edit = false) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			console.log({formData});
			const res = await axios.post('/api/profile', formData, config)
			console.log("res.data: ", res.data);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
			setAlert(edit ? 'Team Info Updated' : 'Team Created', 'success')
			// if (!edit) {
			// 	history.push('/dashboard')
			// }
			history.push('/dashboard');
		} catch (err) {
			console.log({err})
			const errors = err.response.data.errors
			if(errors) {
			errors.forEach(error => setAlert(error.msg, 'danger'))
		}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.StatusText,
					status: err.response.status,
				},
			})
		}
	}

	//Get current user's profile:
	const getCurrentProfile = async () => {
		try {
			console.log("at least hit this")
			const res = await axios.get('/api/profile/me');
			console.log("res.data in getCurrentProfile: ", res.data);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		} catch (err) {
			console.log('err being hit in getCurrentProfile()')
			console.log(err.response)
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.StatusText,
					status: err.response.status,
				},

			})
		}
	}
	//Load user
	const loadUser = async () => {
		console.log("loadUser fired");
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}
		try {
			const res = await axios.get('/api/auth');
			console.log("res.data: ", res.data)
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		} catch (err) {
			console.log({err})
			
			dispatch({
				type: AUTH_ERROR,
			})
		}
	}
	//login user
	const login = async (email, password) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const body = JSON.stringify({ email, password })
		try {
			const res = await axios.post('/api/auth', body, config)

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			})
			loadUser()
		} catch (err) {
			console.log({ err})
		const errors = err.response.data.errors
			if (errors) {
				errors.forEach(error => {
					
					setAlert(error.msg, 'danger')
				})
			}
			dispatch({
				type: LOGIN_FAIL,
			})
		}
	}
	//logout user

	const logout = () => {
		console.log("Logout being hit!!")

		dispatch({ type: LOGOUT })
		dispatch({ type: CLEAR_PROFILE })
			window.location.reload(false);
	}

	
	const setAlert = (msg, type) => {
		const id = uuid()
	
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		})
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
	}

	//Set the product to be put into Stripe
	const setProduct = product => {
		dispatch({
			type: SET_SELECTED_PRODUCT,
			payload: product,
		})
	}

	const setEmail = email => {
		dispatch({
			type: SET_EMAIL,
			payload: email,
		})
	}
	const setName = name =>{
		dispatch({
			type: SET_NAME,
			payload: name
		})
	}

	//Register user
	const register = async ({
		firstName,
		lastName,
		email,
		password,
	
	}) => {
		
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const body = { firstName, lastName, email, password }

		try {
		
			setLoading(true)
			const res = await axios.post('/api/users', body, config)
		

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			})
		} catch (err) {
	
			const errors = err.response.data.errors
			if (errors) {
				errors.forEach(error => {
					
					setAlert(error.msg, 'danger')
				})
			}

			dispatch({
				type: REGISTER_FAIL,
			})
		}
	}

	//Set Loading
	const setLoading = trueOrFalse => {
		console.log('Inside setLoading')
		dispatch({
			type: SET_LOADING,
			payload: trueOrFalse,
		})
	}

	return (
		<RegistrationContext.Provider
			value={{
				product: state.product,
				user: state.user,
				loading: state.loading,
				alert: state.alert,
				profile: state.profile,
				error: state.error,
				setProduct,
				setAlert,
				register,
				setEmail,
				setName,
				setLoading,
				login,
				logout,
				getCurrentProfile,
				createProfile,
				loadUser,
				addTeamMembers,
				deleteTeamMember,
				enterScore,
				enterMiles
			}}
		>
			{props.children}
		</RegistrationContext.Provider>
	)
}

export default RegistrationState

//
