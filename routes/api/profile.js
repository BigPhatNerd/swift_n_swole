const express = require('express')
const router = express.Router()
const request = require('request')
const { Appointment, User } = require('../../models')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')


//@route GET api/appointment/all
//@desc Get all users appointments
//@access Public
router.get('/all', async (req, res) => {
	try {
		const appointment = await Appointment.find({})
		res.json(appointment)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

//@route GET api/appointment/me
//@desc Get current users appointment
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		const appointment = await Appointment.findOne({ user: req.user.id })

		if (!appointment) {
			return res
				.status(400)
				.json({ msg: 'There is no appointment for this user' })
		}
		res.json(appointment)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

//@route POST api/appointment
//@desc Create or update user appointment
//@access Private
router.post('/', auth, async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const { teamName } = req.body

	try {
		console.log('I made it here in creating a appointment')
		const appointment = await Appointment.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: req.body },
			{ new: true, upsert: true }
		)



		if (appointment.miles.total === undefined) {
			var arr = []
			const initialArray = () => {
				for (var i = 0; i < 8; i++) {
					var obj = {
						benchPress: 0,
						deadlift: 0,
						hasSubmitted: false,
					}
					appointment.reps.push(obj)
				}

				return arr
			}
			await initialArray()
			appointment.miles.total = 0;
			appointment.miles.hasSubmitted = false;
		}


		appointment.save()

		res.json(appointment)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

//@route GET api/appointment
//@desc Get all appointments
// @acess Public
router.get('/', async (req, res) => {
	try {
		const appointments = await Appointment.find().populate('User', [
			'name',
			'avatar',
		])
		res.json(appointments)
	} catch {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

//@route GET api/appointment/user/:user_id
//@desc Get appointment by user_id
//@access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const appointment = await Appointment.findOne({ userOne: req.params.user_id })
		if (!appointment) return res.status(400).json({ msg: 'Appointment not found' })
		res.json(appointment)
	} catch (err) {
		console.error(err.message)
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Appointment not found' })
		}
		res.status(500).send('Server error')
	}
})

//@route DELETE api/appointment
//@desc Delete appointment, user, and posts
//@access Private

router.delete('/', auth, async (req, res) => {
	try {
		await Appointment.findOneAndRemove({ user: req.user.id })
		//Remove user
		await User.findOneAndRemove({ _id: req.user.id })
		res.json({ msg: 'User deleted' })
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route    PUT api/appointment/team-member
// @desc     Add Team Member
// @access   Private
router.put(
	'/team-member',
	[
		auth,
		[
			check('participantName', 'Name is required').not().isEmpty(),
			check('participantGender', 'Gender is required').not().isEmpty(),
			check('participantCellPhone', 'Phone is required').not().isEmpty(),
			check('participantAddress', 'Address is required').not().isEmpty(),
			check('participantCity', 'City is required').not().isEmpty(),
			check('participantState', 'State is required').not().isEmpty(),
			check('participantZip', 'Zip is required').not().isEmpty(),
			check('participantEmail', 'Email is required').not().isEmpty(),
			check('participantDOB', 'DOB is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const {
			participantName,
			participantGender,
			participantCellPhone,
			participantAddress,
			participantCity,
			participantState,
			participantZip,
			participantEmail,
			participantDOB,
		} = req.body

		const newMember = {
			participantName,
			participantGender,
			participantCellPhone,
			participantAddress,
			participantCity,
			participantState,
			participantZip,
			participantEmail,
			participantDOB,
		}

		try {
			const appointment = await Appointment.findOne({ user: req.user.id })
			appointment.team.unshift(newMember)
			await appointment.save()
			res.json(appointment)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route    PUT api/appointment/add-score/:hour
// @desc     Add Reps to score
// @access   Private

router.put(
	'/add-score/:hour',
	[
		auth,
		[
			check('benchPress', 'Bench press is required').not().isEmpty(),
			check('deadlift', 'Deadlift is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		console.log('req.body: ', req.body)
		const { benchPress, deadlift } = req.body

		const newScore = {
			benchPress,
			deadlift,
		}
		const position = req.params.hour
		console.log({ position })

		try {
			const appointment = await Appointment.findOne({ user: req.user.id })
			const insertInfo = {
				benchPress,
				deadlift,
				hasSubmitted: true,
			}

			appointment.reps[position] = insertInfo

			// appointment.save()

			await appointment.save()

			res.json(appointment)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)
// @route    PUT api/appointment/add-miles
// @desc     Add Miles to score
// @access   Private

router.put('/add-miles', auth, async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	console.log('req.body: ', req.body)
	const { total } = req.body
	try {
		const appointment = await Appointment.findOne({ user: req.user.id })
		const insertInfo = {
			total,
			hasSubmitted: true,
		}

		appointment.miles = insertInfo;
		await appointment.save();

		res.json(appointment)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route    DELETE api/appointment/team-member/:id
// @desc     Delete Team Member
// @access   Private
router.delete('/team-member/:id', auth, async (req, res) => {
	try {
		const foundTeamMember = await Appointment.findOne({ user: req.user.id })
		const memberIds = foundTeamMember.team.map(member =>
			member._id.toString()
		)
		const removeIndex = memberIds.indexOf(req.params.id)
		if (removeIndex === -1) {
			return res.status(500).json({ msg: 'Server error' })
		} else {
			foundTeamMember.team.splice(removeIndex, 1)
			await foundTeamMember.save()
			return res.status(200).json(foundTeamMember)
		}
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

module.exports = router
