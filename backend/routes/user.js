const express = require('express')
const {
    createUser,
    getUsersByGroup,
    getUserbyName,
    updateUser,
    deleteUser
} = require('../controllers/UserControllers')
const e = require('express')

const router = express.Router()

// POST a new user
router.get('/', createUser)

// GET all users in a group
router.get('/:code', getUsersByGroup)

// GET a user
router.post('/:usrname', getUserbyName)

// UPDATE a user
router.patch('/:username', updateUser)

// DELETE a user
router.delete('/:username', deleteUser)

module.exports = router