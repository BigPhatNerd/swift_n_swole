const { check, validationResult } = require('express-validator');


const validationHelpers = {
	// profileValidations: [
	// 		check('teamName', 'Team Name is required').not().isEmpty(),
	// 		check('userOneDOB', 'DOB is required').isISO8601().toDate(),
	// 		check('userOneWeight', 'Weight is required').not().isEmpty(),
	// 		check(
	// 			'userTwoName',
	// 			'Team member name is required (can be changed later)'
	// 		)
	// 			.not()
	// 			.isEmpty(),
	// 		check(
	// 			'userTwoEmail',
	// 			'Team member email is required (can be changed later)'
	// 		)
	// 			.not()
	// 			.isEmpty()
	// 			.normalizeEmail()
	// 			.isEmail(),
	// 		check(
	// 			'userTwoWeight',
	// 			'Team member weight is required (can be changed later)'
	// 		)
	// 			.not()
	// 			.isEmpty(),
	// 		check(
	// 			'userTwoDOB',
	// 			'Team member DOB is required (can be changed later)'
	// 		)
	// 			.isISO8601()
	// 			.toDate(),
	// 	],
	profileValidations: [
	 		check('teamName', 'Team Name is required').not().isEmpty()
	 		],
		userValidations: [
		check('firstName', 'First name is required').not().isEmpty(),
		check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Please include a valid email').normalizeEmail().isEmail(),
        check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
    ]

}

module.exports = validationHelpers