const driver = require('../server')

// Update user's groupID to join new group
const updateGroupId = async (req, res) => {
    const { username, groupID } = req.body

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
            { username, groupID }
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
}


const updateDebt = async (req, res) => {
    const { recipient_username, sender_username, amount } = req.body

    let session = driver.session();
    try {
        const result = await session.run(
            `MATCH (u1: User {username: $recipient_username})-[r:MONEY_OWED]->(u2: User {username: $sender_username})
            SET r.amount = r.amount + $amount`,
            { recipient_username, sender_username, amount }
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
}

const getDebt = async (req, res) => {
    const { username } = req.body

    let session = driver.session();
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
        res.status(200).json(records)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
}


const getCredit = async (req, res) => {
    const { username } = req.body

    let session = driver.session()
    try {
        const result = await session.run(
            `MATCH (otherUser:User)-[r:MONEY_OWED]->(user:User {username: $username})
            RETURN user.username AS userName, otherUser.username AS friendName, r.amount`,
            { username }
        )
        const records = result.records.map(record => ({
            userName: record.get('userName'),
            friendName: record.get('friendName'),
            amount: record.get('amount')
        }));
        res.status(200).json(records)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close()
    }
}

const getUsersInGroup = async (req, res) => {
    const { groupID } = req.params

    let session = driver.session()
    try {
        const result = await session.run(
            `MATCH (user:User {groupID: $groupID})
            RETURN user.username AS username`,
            { groupID }
        )
        const users = result.records.map(record => record.get('username'))
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close()
    }
}

const getGroupID = async (req, res) => {
    const { username } = req.body

    let session = driver.session()
    try {
        const result = await session.run(
            `MATCH (user:User {username = $username})
            RETURN user.groupID AS groupID`,
            {username}
        )

        const groupID = result.records[0].get('groupID')
        res.status(200).json(groupID)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close()
    }
}



module.exports = {
    updateGroupId,
    updateDebt,
    getDebt,
    getCredit,
    getUsersInGroup,
    getGroupID
}





