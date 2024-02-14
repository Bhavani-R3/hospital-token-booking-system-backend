const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connect')
const PORT = process.env.PORT

const app = express()

// body parser
app.use(express.urlencoded({ extended: false })) // query format of data
app.use(express.json()) // json format of data 

// middleware
app.use(cors()) // cross origin resource sharing
app.use(cookieParser(process.env.ACCESS_SECRET))

// api route
app.use(`/api/patient`, require('./route/patientRoute'))

app.use(`**`, (req,res) => {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ msg: `Requested service path not available`, success: false })
})

// server listen
app.listen(PORT,() => {
    connectDb()
    console.log(`server is started and running @ http://localhost:${PORT}`)
 })