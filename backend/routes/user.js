const express = require('express')
const {
    createUser
} = require('../controllers/UserBalanceController')

const router = express.Router()

// POST a new user
router.post('/', createUser)