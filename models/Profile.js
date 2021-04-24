const { Schema, model, Types } = require('mongoose')

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
     teamName: {
        type: String,
        required: true,
        unique: true,
    },
   
    team: [
    {
    participantName: {
        type: String,
        required: true,
    },
    participantGender: {
        type: String,
        required: true,
    },
     participantCellPhone: {
        type: Number,
        required: true,
    },
    participantAddress: {
        type: String,
        required: true,
    },
    participantCity: {
        type: String,
        required: true,
    },
    participantState: {
        type: String,
        required: true,
    },
   
    participantZip: {
        type: Number,
        required: true,
    },
    participantEmail: {
        type: String,
        required: true,
    },
    
    participantDOB: {
        type: String,
        required: true,
    },
}
], 
    date: {
        type: Date,
        default: Date.now,
    },
})

const Profile = model('Profile', ProfileSchema)
module.exports = Profile
