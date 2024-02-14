const { StatusCodes } = require('http-status-codes')
const Patient = require('../model/patientModel')
// const createAccessToken = require('../util/token')

const create = async (req,res) => {
    try {
        const { name, mobile, issue } = req.body

        // mobile validate to avoid duplicates
        const extMobile = await Patient.findOne({ mobile })
        const patients = Patient.find({})
        var genToken = patients.length;
        
        // async function getUserDataLength(){
        //     var count = patients.countDocuments({})
        //     genToken = count + 10
        // }
        // getUserDataLength()
        // point the duplicate
        if(extMobile) 
            return res.status(StatusCodes.CONFLICT).json({ msg: `${mobile} already token is booked`, success: false })
        
        // adding data into db collections
        let data = await Patient.create({
            name,
            mobile,
            issue,  
            token: genToken   
        })

        // generate access token
        // let authToken = createAccessToken({ id: mobile._id })

        // set the token in cookies
        /* res.cookie('registerToken', authToken, {
            httpOnly: true,
            signed: true,
            path: `/api/auth/token`,
            maxAge: 1 * 24 * 60 * 60 * 1000
        }) */

        res.status(StatusCodes.ACCEPTED).json({ msg: "New user registered successfully", user:data, success: true })
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message, success: false })
    }
}

const readAll = async (req,res) => {
    try {
        let patients  = await Patient.find({})

        res.status(200).json({ length: patients.length, patients })
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message, success: false })
    }
}

const readSingle = async (req,res) => {
    try {
        let id = req.params.id
        let single = await Patient.findById({ _id: id})
            if(!single)
               return res.status(404).json({ msg: `Requested id not found`})

        res.status(200).json({ patient: single })
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message, success: false })
    }
}

module.exports = { create, readAll, readSingle }