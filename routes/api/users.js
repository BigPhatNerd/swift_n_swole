const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../models');
const { check, validationResult } = require('express-validator');
const { userValidations } = require('../validationHelpers');


//@route GET api/users
//@desc Test route
//@access Public
router.get("/", (req, res) => {
	res.send("User route");
})

//@route POST api/users
//@desc Register route
//@access Public
router.post('/', userValidations,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, email, password, eventId } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                firstName,
                lastName,
                email,
                eventId,
                avatar,
                password
            });
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
               process.env.JWT_SECRET, { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    });


module.exports = router