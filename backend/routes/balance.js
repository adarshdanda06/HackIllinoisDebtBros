const express = require('express')
const {
    createUser,
    updateGroupId,
    updateDebt,
    getDebt,
    getCredit,
    getUsersInGroup
} = require('../controllers/UserBalanceController')

const router = express.Router()

router.get('/:groupID', getUsersInGroup)

router.get('/', getDebt)

router.get('/', getCredit)

router.post('/', createUser)

router.patch('/', updateDebt)

router.patch('/', updateGroupId)

module.exports = router