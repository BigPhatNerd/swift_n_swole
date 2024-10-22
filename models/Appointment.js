const { Schema, model } = require('mongoose');

const AppointmentSchema = new Schema({
    customerFirstName: {
        type: String,
        required: true
    },
    customerLastName: {
        type: String,
        required: true
    },
    customerCelPhone: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerCity: {
        type: String,
        required: true
    },
    customerState: {
        type: String,
        required: true
    },
    customerZip: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerDOB: {
        type: Date,
        required: true
    },
    customerVehicleVIN: {
        type: String,
        required: true
    },
    customerVehicleInfoAndUpgrades: {
        type: String,
        required: true
    },
    customerVehiclePics: {
        type: [String], // Store file paths or URLs for uploaded pics
    },
    customerDesiredMusic: {
        type: String
    },
    selectedOptions: [
        {
            name: String,
            descr: String,
            price: Number,
            id: Number
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Appointment = model('Appointment', AppointmentSchema);
module.exports = Appointment;
