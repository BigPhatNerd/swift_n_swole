const express = require('express')
const router = express.Router()
const request = require('request')
const { Profile, User } = require('../../models')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const { profileValidations } = require('../validationHelpers')

//@route GET api/profile/all
//@desc Get all users profiles
//@access Public
router.get('/all', async (req, res) => {
	try {
		const profile = await Profile.find({})
		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no profile for this user' })
		}
		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post('/', [auth, profileValidations], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const { teamName } = req.body

	try {
		console.log('I made it here in creating a profile')
		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: req.body },
			{ new: true, upsert: true }
		)

		
		
		 if(profile.miles.total === undefined){
		 	var arr = []
		const initialArray = () => {
			for (var i = 0; i < 8; i++) {
				var obj = {
					benchPress: 0,
					deadlift: 0,
					hasSubmitted: false,
				}
				profile.reps.push(obj)
			}

			return arr
		}
		await initialArray()
		profile.miles.total = 0;
		profile.miles.hasSubmitted = false;
	} 
		

		profile.save()

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

//@route GET api/profile
//@desc Get all profiles
// @acess Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('User', [
			'name',
			'avatar',
		])
		res.json(profiles)
	} catch {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

//@route GET api/profile/user/:user_id
//@desc Get profile by user_id
//@access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ userOne: req.params.user_id })
		if (!profile) return res.status(400).json({ msg: 'Profile not found' })
		res.json(profile)
	} catch (err) {
		console.error(err.message)
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.status(500).send('Server error')
	}
})

//@route DELETE api/profile
//@desc Delete profile, user, and posts
//@access Private

router.delete('/', auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id })
		//Remove user
		await User.findOneAndRemove({ _id: req.user.id })
		res.json({ msg: 'User deleted' })
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route    PUT api/profile/team-member
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
			const profile = await Profile.findOne({ user: req.user.id })
			profile.team.unshift(newMember)
			await profile.save()
			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route    PUT api/profile/add-score/:hour
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
			const profile = await Profile.findOne({ user: req.user.id })
			const insertInfo = {
				benchPress,
				deadlift,
				hasSubmitted: true,
			}

			profile.reps[position] = insertInfo

			// profile.save()

			await profile.save()

			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)
// @route    PUT api/profile/add-miles
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
		const profile = await Profile.findOne({ user: req.user.id })
		const insertInfo = {
			total,
			hasSubmitted: true,
		}

		profile.miles = insertInfo;
		await profile.save();

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route    DELETE api/profile/team-member/:id
// @desc     Delete Team Member
// @access   Private
router.delete('/team-member/:id', auth, async (req, res) => {
	try {
		const foundTeamMember = await Profile.findOne({ user: req.user.id })
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
