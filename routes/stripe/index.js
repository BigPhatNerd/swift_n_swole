const stripe = require('stripe')(process.env.STRIPE_SECRET)
const express = require('express')
const router = express.Router()
const { User } = require('../../models')

async function postCharge(req, res) {
	try {
		const { amount, source, receipt_email, eventId } = req.body
		const charge = await stripe.charges.create({
			amount,
			currency: 'usd',
			source,
			receipt_email,
		})
		if (!charge) throw new Error('charge unsuccessful')
		if (charge) {
		
			const user = await User.findOne({ email: receipt_email })
		
			user.paid = true;
			user.eventId = eventId;

			await user.save()
		}

		res.status(200).json({
			message: 'charge posted successfully',
			charge,
		})
	} catch (error) {
		res.status(500).json({
			message: error.message,
		})
	}
}

router.post('/charge', postCharge)

module.exports = router
