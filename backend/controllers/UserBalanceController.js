const neo4j = require('neo4j-driver')

const initDriver = async () => {
    try {
        // connecting to db
        const URI = 'neo4j+s://7d1a0d62.databases.neo4j.io'; // Replace with your actual URI
        const USER = 'neo4j'; // Replace with your actual username
        const PASSWORD = 'SYJog0Ps7HJLMg6cpGSwGxftlfuIjdqreFewtbMaIP8'; // Replace with your actual password

        driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
        const session = driver.session();
        try {
            const result = await session.run('RETURN 1 AS test');
            console.log('Connection test successful:', result.records[0].get('test').toInt() === 1);
        } finally {
            await session.close();
        }
        return driver;
    } catch (err) {
        console.error('Connection test failed:', err);
        throw err;
    }
};


const testConnection = async () => {
    let driver = await initDriver();
    try {
        const info = await driver.getServerInfo();
        console.log('Connection established: ', info);
        console.log("Driver has connected")
    } catch (error) {
        console.error('Connection test failed:', error);
    } 
};

testConnection();

// Update user's groupID to join new group
// Works
const updateGroupId = async (req, res) => {
    const { username, groupID } = req.body
    let driver = await initDriver();
    let session = driver.session();
    try {
        const result = await session.run(
            `MATCH (user: User {username: $username})
            SET user.groupID = $groupID

            WITH user
            MATCH (otherUser: User)
            WHERE user.groupID = otherUser.groupID and user.username <> otherUser.username
            MERGE (user)-[:MONEY_OWED {amount: 0}]->(otherUser)
            MERGE (otherUser)-[:MONEY_OWED {amount: 0}]->(user)`,
            { username, groupID }
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
}

// Works
const updateDebt = async (req, res) => {
    const { recipient_username, sender_username, amount } = req.body
    let driver = await initDriver();
    let session = driver.session();
    try {
        const result = await session.run(
            `MATCH (u1: User {username: $sender_username})-[r:MONEY_OWED]->(u2: User {username: $recipient_username})
            SET r.amount = r.amount + $amount`,
            { sender_username, recipient_username, amount }
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
}


const getDebt = async (req, res) => {
    const { username } = req.body;
    let driver = await initDriver();
    let session = driver.session();

    try {
        const result = await session.run(
            `MATCH (user:User {username: $username})-[r:MONEY_OWED]->(otherUser:User)
            RETURN user.username AS userName, otherUser.username AS friendName, r.amount AS amount`,
            { username: String(username) }
        )
        console.log(username);
        const records = result.records.map(record => ({
            userName: record.get('userName'),
            friendName: record.get('friendName'),
            amount: record.get('amount')
        }));
        res.status(200).json(records) // chg to records
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close();
    }
}



const getCredit = async (req, res) => {
    const { username } = req.body
    let driver = await initDriver();
    let session = driver.session()
    try {
        const result = await session.run(
            `MATCH (otherUser:User)-[r:MONEY_OWED]->(user:User {username: $username})
            RETURN user.username AS userName, otherUser.username AS friendName, r.amount AS amount`,
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

// Works
const getUsersInGroup = async (req, res) => {
    const { groupID } = req.params
    let driver = await initDriver();
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
            `MATCH (user:User {username: $username})
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





