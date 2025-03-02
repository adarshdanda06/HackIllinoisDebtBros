//const driver = require('../server')
const { v1: uuidv1 } = require('uuid')

// Create new user
// Works
const createUser = async (req,res) => {
    const { username, password } = req.body
    const groupID = uuidv1()

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