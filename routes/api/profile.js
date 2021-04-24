const express = require('express');
const router = express.Router();
const request = require('request');
const { Profile, User } = require('../../models');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const { profileValidations } = require('../validationHelpers');




//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		console.log("req.user: ", req.user);
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('User', ['firstName', 'avatar'])
		console.log({ profile })
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
router.post(
	'/',
	[
		auth,
		profileValidations,
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const {
			teamName,
			
		} = req.body
		

		try {
			
console.log("I made it here in creating a profile")
				const profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: req.body },
					{ new: true, upsert: true }
				)

				return res.json(profile)
			
			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server error')
		}
	}
)

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
});



//@route GET api/profile/user/:user_id
//@desc Get profile by user_id
//@access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ userOne: req.params.user_id }).populate('User', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server error');
    }
});

//@route DELETE api/profile
//@desc Delete profile, user, and posts
//@access Private

router.delete('/', auth, async (req, res) => {
    try {
      
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });;
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router
