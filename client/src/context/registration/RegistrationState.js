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
} from '../types'

import setAuthToken from '../../utils/setAuthToken'

const RegistrationState = props => {
	const initialState = {
		product: {},
		user: {
			isAuthenticated: false,
			email: '',
		},
		loading: true,
		alert: [],
		profile: null,
	}

	const [state, dispatch] = useReducer(RegistrationReducer, initialState)

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
			if (!edit) {
				history.push('/dashboard')
			}
		} catch (err) {
			console.log({err})
			const errors = err.response.data.errors
			errors.forEach(error => setAlert(error.msg, 'danger'))

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
			const res = await axios.get('/api/profile/me')
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		} catch (err) {
			console.log('err being hit in getCurrentProfile()')
			console.log(err.response)
			dispatch({
				type: PROFILE_ERROR,
			})
		}
	}
	//Load user
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}
		try {
			const res = await axios.get('/api/auth')
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		} catch (err) {
			setAlert(err.response.data.msg, 'danger')
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
			setAlert(err.response.data.msg, 'danger')
			dispatch({
				type: LOGIN_FAIL,
			})
		}
	}
	//logout user

	const logout = () => {
		dispatch({ type: LOGOUT })
		dispatch({ type: CLEAR_PROFILE })
	}

	//Set alert(likely not used)
	const setAlert = (msg, type) => {
		const id = uuid()
		console.log('in setAlert')
		console.log({ msg })
		console.log({ type })
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		})
		setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000)
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

	//Register user
	const register = async ({
		firstName,
		lastName,
		email,
		password,
		eventId,
	}) => {
		console.log('Does register get hit?')

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const body = { firstName, lastName, email, password, eventId }

		try {
			console.log('Here I am ')
			console.log({ body })
			setLoading()
			const res = await axios.post('/api/users', body, config)
			console.log({ res })

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			})
		} catch (err) {
			console.log({ err })
			const errors = err.response.data.errors
			console.log({ errors })
			if (errors) {
				console.log(
					'There was an error registration, dispatch SET_ALERT'
				)
				//Come back to this and figure out how to import

				errors.forEach(error => {
					console.log({ error })
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
				setProduct,
				setAlert,
				register,
				setEmail,
				setLoading,
				login,
				logout,
				getCurrentProfile,
				createProfile
			}}
		>
			{props.children}
		</RegistrationContext.Provider>
	)
}

export default RegistrationState

//
