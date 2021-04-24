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
CLEAR_PROFILE
} from '../types';

const RegistrationReducer = (state, action) => {

	switch (action.type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
		return {
			...state,
			profile: action.payload,
			loading: false
		};
		case PROFILE_ERROR:
		return {
			...state,
			loading: false
		};
		case CLEAR_PROFILE:
		return {
			...state,
			profile: null,
			loading: false
		}
		case SET_SELECTED_PRODUCT:
		return {
			...state,
			product: action.payload
		};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
		localStorage.setItem('token', action.payload.token);
		return {
			...state,
			user:{
				isAuthenticated: true,
				email: state.user.email

			},
			loading: false,
			alert: []
		};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		localStorage.removeItem('token');
		return {
			...state, 
			token: null,
			user:{
				isAuthenticated: false,
				email: state.user.email
			},
			loading: false
		};
		case SET_LOADING:
		return {
			...state, 
			loading: action.payload
		};
		case SET_ALERT:
		console.log("action.payload: ", action.payload);
		console.log({state})
		return {
			...state,
			alert: [...state.alert, action.payload]
		};
		case REMOVE_ALERT: 
		return {
			...state,
			alert: []
		};
		case SET_EMAIL:
		console.log("action.payload in SET EMAIL: ", action.payload);
		console.log({state})
		return {
			...state,
			user: {
				isAuthenticated: state.user.isAuthenticated,
				email: action.payload
			}
		};
		case USER_LOADED: 
		return {
			...state,
			user: {
				...state.user,
				isAuthenticated: state.user.isAuthenticated
			}
		}
	
		default: 
		return state
	}
}

export default RegistrationReducer