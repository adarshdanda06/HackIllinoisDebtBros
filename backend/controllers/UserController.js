//const driver = require('../server')
const { v1: uuidv1 } = require('uuid')
const neo4j = require('neo4j-driver')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();


const createToken = (id) => {
    return jwt.sign({username: id}, "HackIllniDefSecret", { expiresIn: '3d' })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

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
const signup = async (req,res) => {
    const { username, password } = req.body
    const groupID = uuidv1()
    const driver = await initDriver();
    let session = driver.session()
    try {

        if (!username || !password) {
            throw new Error("Both fields must be filled!")
        }

        const count = await session.run(
            `MATCH(u:User {username: $username})
            RETURN COUNT(u) AS count`,
            { username }   
        )

        if (count.records[0].get('count') > 0) {
            res.status(400).json({error: "user with username already exists!"})
            return
        }

        const hashedPassword = await hashPassword(password)
        const result = await session.run(
            `CREATE (u1: User {username: $username, password: $password, groupID: $groupID})`,
            { username, password: hashedPassword, groupID }
        )
        console.log("success")
        const token = createToken(username)
        res.status(200).json({username, groupID, token})
    } catch (error) {
        res.status(400).json(`Error: ${error.message}`)
    } finally {
        await session.close()
    }        
}


const login = async (req, res) => {
    const { username, password } = req.body
    
    let session = driver.session()
    try {
        if (!username || !password) {
            throw new Error('Both fields must be filled')
        }

        const result = await session.run(
            `MATCH(u:User {username: $username})
            RETURN u.password AS password`,
            { username }   
        )

        if (result.records.length === 0 || result.records[0].get('password') == null) {
            res.status(400).json({error: "No user with this username"})
            return
        }
        
        const userPassword = result.records[0].get('password')
        
        const match = await bcrypt.compare(password, userPassword)
    
        const group = await session.run(
            `MATCH (u:User {username: $username})
            RETURN u.groupID AS groupID
            `,
            { username }
        );

        if (!match) {
            throw Error('Incorrect password');
        }

        const token = createToken(username)
        res.status(200).json({username, "groupID": group.records[0].get("groupID"), token})
    } catch (error) {
        res.status(400).json(error.message)
    } finally {
        await session.close()
    }
}

module.exports = {
    signup,
    login
}

