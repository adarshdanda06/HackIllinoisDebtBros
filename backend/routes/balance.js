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
router.get('/debt', getDebt);


router.get('/credit', getCredit); 

router.get('/', getGroupID);

// GET the users in a group by groupID
router.get('/:groupID', getUsersInGroup);

// works


 // works


router.get('/:groupID', getUsersInGroup); // works


router.post('/createUser', signup); // works


router.patch('/', updateDebt); // works


router.patch('/join', updateGroupId); // works

module.exports = router;