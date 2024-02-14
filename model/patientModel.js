// user schema 
const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    issue: {
        type: String,
        required: true
    },
    token:{
        type:String
    }
},{
    collection: "patients",
    timestamps: true
})

module.exports = mongoose.model("Patient", patientSchema)