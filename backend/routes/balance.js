const express = require('express')
//const driver = require('../server')

const {
    updateGroupId,
    updateDebt,
    getCredit,
    getUsersInGroup,
    getDebt,
    getGroupID
} = require('../controllers/UserBalanceController')
const requireAuth = require('../middleware/requireAuth')

const {
    signup,
    login
} = require('../controllers/UserController')

const router = express.Router()


router.use(requireAuth)

// GET a user's group code
router.get('/', getGroupID)

// GET the users in a group by groupID
router.get('/:groupID', getUsersInGroup)

router.get('/credit', getCredit); // works


router.get('/debt', getDebt); // works


router.get('/:groupID', getUsersInGroup); // works


router.post('/createUser', signup); // works


router.patch('/', updateDebt); // works


router.patch('/join', updateGroupId); // works

module.exports = router;