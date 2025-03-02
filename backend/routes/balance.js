const express = require('express')
//const driver = require('../server')

const {
    updateGroupId,
    updateDebt,
    getCredit,
    getUsersInGroup,
    getDebt
} = require('../controllers/UserBalanceController')

const {
    createUser
} = require('../controllers/UserController')

const router = express.Router()


router.get('/credit', getCredit); // works


router.get('/debt', getDebt); // works


router.get('/:groupID', getUsersInGroup); // works


router.post('/createUser', createUser); // works


router.patch('/', updateDebt); // works


router.patch('/join', updateGroupId); // works

module.exports = router;