const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');
//@route GET api/auth
//@desc Test route
//@access Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
});

// @route  POST api/auth
// @descr   Auth user
// @access  Public
router.post('/',
    [

        check('email', 'Please include a valid email'),
        check('password', 'Password is required.')
        .exists()
    ],
    async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
       

        try {
            let user = await User.findOne({ email });

            if (!user) {
              
                
                return res
                    .status(400)
                    .json({errors: [{ msg: 'Invalid credentials' }]});
            }
                      const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            console.log("Do I make it down here in login on the backside?")
            jwt.sign(
                payload,
                process.env.JWT_SECRET, { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    console.log({token})
                    res.json({ token });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    });




module.exports = router
