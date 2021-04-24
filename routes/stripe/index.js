const stripe = require('stripe')(process.env.STRIPE_SECRET)
const express = require('express');
const router = express.Router();

async function postCharge(req, res){
	try {
		const { amount, source, receipt_email } = req.body;
		console.log("All up in stripe");
		const charge = await stripe.charges.create({
			amount, 
			currency: "usd",
			source,
			receipt_email
		})
		if(!charge) throw new Error('charge unsuccessful');

		res.status(200).json({
			message: 'charge posted successfully',
			charge
		})
	} catch(error) {
		res.status(500).json({
			message: error.message
		})
		
	}
}

router.post('/charge', postCharge)





module.exports = router