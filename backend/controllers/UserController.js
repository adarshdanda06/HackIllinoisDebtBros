const driver = require('../server')
const { v1: uuidv1 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, { expiresIn: '3d' })
}

const hashPassword = (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
}

// Create new user
const signup = async (req,res) => {
    const { username, password } = req.body
    const groupID = uuidv1()

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
        }

        const hashedPassword = hashPassword(password)
        const result = await session.run(
            `CREATE (u1: User {username: $username, password: $pass, groupID: $groupID})`,
            { username, password: hashPassword, groupID }
        )

        const token = createToken(username)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json(error.message)
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
            RETURN COUNT(u) AS count`,
            { username }   
        )

        if (count.records[0].get('count') <= 0) {
            res.status(400).json({error: "No user with this username"})
        }
        
        const userPassword = result.records[0].get('password')
        
        const match = await bcrypt.compare(password, userPassword)
        
        if (!match) {
            throw Error('Incorrect password')
        }

        token = createToken(username)
        res.status(200).json({username, token})
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