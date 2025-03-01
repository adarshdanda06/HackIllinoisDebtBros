const driver = require('../server')
const { v1: uuidv1 } = require('uuid');

// create new user
const createUser = async (req,res) => {
    const { username, password } = req.body
    const group_id = uuidv1();
    try {
        const result = await session.run(
            `CREATE (u1: User {username: $username, password: $password, group: $groupID})`,
            { username, password, group_id }
        )
        res.json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }        

        /*
        Query To Create
        x = Randomly generated: random
        CREATE (u1: User {username: $username, password: $password, group: $groupID})
        */

}


const joinGroup = async (req, res) => {
    const { username, group_id } = req.body
    let session = driver.session();
    try {
        const result = await session.run(
            `MATCH (user: User {username: $username})
            SET user.groupID = $groupID

            WITH user
            MATCH (otherUser: User)
            WHERE user.groupID = otherUser.groupID and user.username <> otherUser.username
            MERGE (user) -> [:MONEY_OWED {amount: 0}] -> (otherUser)
            MERGE (otherUser) -> [:MONEY_OWED {amount: 0}] -> (user)`,
            { username, group_id }
        )
        res.json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
    // Validate Group ID
    // require current user, require group_id
    /*
    MATCH (user: User {username: $username})
    SET user.groupID = $groupID

    WITH user
    MATCH (otherUser: User)
    WHERE user.groupID = otherUser.groupID and user.username <> otherUser.username
    MERGE (user) -> [:MONEY_OWED {amount: 0}] -> (otherUser)
    MERGE (otherUser) -> [:MONEY_OWED {amount: 0}] -> (user)
    */


}


const changeAmountOwed = async (req, res) => {
    const { username, otherUsername, amount } = req.body
    let session = driver.session();
    try {
        const result = await session.run(
            `MATCH (u1: User {username: $username})-[r:MONEY_OWED]->(u2: User {username: $otherUsername})
            SET r.amount = $amount`,
            { username, otherUsername, amount }
        )
        res.json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
    // need to do + or - a value
    /*
    MATCH (u1: User {username: $username})-[r:MONEY_OWED]->(u2: User {username: $otherUsername})
    SET r.amount = $amount
    */

}

const youOweOthers = async (req, res) => {
    let session = driver.session();
    const { username } = req.params
    try {
        const result = await session.run(
            `MATCH (user:User {username: $username})-[r:MONEY_OWED]->(friend)
            RETURN user.username AS userName, friend.username AS friendName, r.amount`,
            { username }
        )
        const records = result.records.map(record => ({
            userName: record.get('userName'),
            friendName: record.get('friendName'),
            amount: record.get('amount')
        }));
        res.json(records)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
    /*
        MATCH (user:User {userId: 'specificUserId'})-[r:MONEY_OWED]->(friend)
        RETURN user.name AS userName, friend.name AS friendName, r.amount
    */
}


const othersOweYou = async (req, res) => {
    let session = driver.session();

    const { username } = req.params
    try {
        const result = await session.run(
            `MATCH (otherUser:User)-[r:MONEY_OWED]->(user:User {username: $username})
            RETURN user.username AS userName, otherUser.name AS friendName, r.amount`,
            { username }
        )
        const records = result.records.map(record => ({
            userName: record.get('userName'),
            friendName: record.get('friendName'),
            amount: record.get('amount')
        }));
        res.json(records)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
    /*
        MATCH (otherUser:User)-[r:MONEY_OWED]->(user:User {username: 'username'})
        RETURN user.username AS userName, otherUser.name AS friendName, r.amount
    */
}

const getUsersInGroupByID = async (req, res) => {
    let session = driver.session();
    const { code } = req.params
    try {
        const result = await session.run(
            `MATCH (user:User {groupId: $code})
            RETURN user.username`,
            { code }
        )
        const records = result.records.map(record => record.get('user.username'));
        res.json(records)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
    /*
    MATCH (user:User {groupId: $groupId})
    RETURN user
    */

}



module.exports = (
    createUser,
    getUsersInGroupByID,
    changeAmountOwed,
    joinGroup,
    youOweOthers,
    othersOweYou
)





// Done: 

// createUser
// joinGroup(updateUserGroupID and initialize all edges) Need to first check valid groupID
// whosInGroupByID
// changeAmountOwed
// howMuchEveryoneInGroupOwesYou
// howMuchYouOweEveryone






// edges are called moneyOwed
// weights/amount on edges are called amount



