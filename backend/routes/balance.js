const express = require('express')
const {
    updateGroupId,
    updateDebt,
    getDebt,
    getCredit,
    getUsersInGroup
} = require('../controllers/UserBalanceController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET the users in a group by groupID
router.get('/:groupID', getUsersInGroup)

// GET a user's debt
router.get('/debt', getDebt)

// GET a user's credit
router.get('/credit', getCredit)

// PATCH a user's credit and friend's debt  
router.patch('/', updateDebt)

// PATCH a user's groupID to join a group
router.patch('/join', updateGroupId)

module.exports = router