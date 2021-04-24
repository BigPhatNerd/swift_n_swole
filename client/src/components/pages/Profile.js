import React, { useEffect, useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

import RegistrationContext from '../../context/registration/registrationContext'

const CreateProfile = () => {
	const registrationContext = useContext(RegistrationContext)
	const {
		createProfile,
		getCurrentProfile,
		profile,
		loading,
	} = registrationContext
	//Later add a place for team photo
	const [formData, setFormData] = useState({
		teamName: '',
	})
	const { teamName } = formData
	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {
		e.preventDefault()
		createProfile(formData)
	}

	useEffect(() => {
		getCurrentProfile()
	}, [profile])

	return <div>Create Profile</div>
}

export default CreateProfile
