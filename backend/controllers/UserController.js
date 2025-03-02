//const driver = require('../server')
const { v1: uuidv1 } = require('uuid')
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
// Create new user
// Works
const createUser = async (req,res) => {
    const { username, password } = req.body
    const groupID = uuidv1()
    const driver = await initDriver();
    let session = driver.session()
    try {
        const result = await session.run(
            `CREATE (u1: User {username: $username, password: $password, groupID: $groupID})`,
            { username, password, groupID }
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close()
    }        
}

module.exports = {
    createUser
};