const express = require('express')
//const driver = require('../server')

const {
    updateGroupId,
    updateDebt,
    getDebt,
    getCredit,
    getUsersInGroup,
} = require('../controllers/UserBalanceController')

const {
    createUser
} = require('../controllers/UserController')

const router = express.Router()
/*
const testConnection = async () => {
    let session;
    try {
        const info = await global.driver.getServerInfo();
        console.log('Connection established: ', info);
    } catch (error) {
        console.error('Connection test failed:', error);
    } 
};*/

//testConnection();

// GET the users in a group by groupID
router.get('/:groupID', getUsersInGroup)

// GET a user's debt
router.get('/debt', getDebt)

// POST create user
router.post('/createUser', createUser)

// GET a user's credit
router.get('/credit', getCredit)

// PATCH a user's credit and friend's debt  
router.patch('/', updateDebt)

// PATCH a user's groupID to join a group
router.patch('/join', updateGroupId)

module.exports = router;