const express = require('express')
const {
    login,
    signup
} = require('../controllers/UserController')

const router = express.Router()

// GET a user
router.get('/login', login)

// POST a new user
router.post('/signup', signup)

module.exports = router
