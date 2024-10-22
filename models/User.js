const { Schema, model, Types } = require('mongoose')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	appointments: [{
		type: Schema.Types.ObjectId,
		ref: 'Appointment'
	}]
})
const User = model('User', UserSchema)
module.exports = User 