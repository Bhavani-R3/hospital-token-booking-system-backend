const { create, readAll, readSingle } = require('../controller/patientController')

const route = require('express').Router()
// const auth = require('../middleware/auth')

// user register
route.post(`/create`, create)

// user login
route.get(`/all`, readAll).get(`/single/:id`, readSingle)

/* // user auth token
route.get(`/token`, authToken)

// current login user
route.get(`/current/user`,auth, currentUser)

// verify user
route.post(`/verify/user`, verifyUser) */

module.exports = route