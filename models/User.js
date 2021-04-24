const { Schema, model, Types } = require('mongoose')

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	eventId: {
		type: Number,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})
const User = model('User', UserSchema)
module.exports = User 