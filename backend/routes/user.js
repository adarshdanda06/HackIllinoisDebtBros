const express = require('express')
const {
    createUser,
    getUsersByGroup,
    getUserbyName,
    updateUser,
    deleteUser
} = require('../controllers/UserDebtControllers')

const router = express.Router()

module.exports = router