const driver = require('../server')
const { v1: uuidv1 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, { expiresIn: '3d' })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
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
            return
        }

        const hashedPassword = await hashPassword(password)
        const result = await session.run(
            `CREATE (u1: User {username: $username, password: $pass, groupID: $groupID})`,
            { username, password: hashedPassword, groupID }
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
            RETURN u.password AS password`,
            { username }   
        )

        if (result.records.length === 0 || result.records[0].get('password') == null) {
            res.status(400).json({error: "No user with this username"})
            return
        }
        
        const userPassword = result.records[0].get('password')
        
        const match = await bcrypt.compare(password, userPassword)
        
        if (!match) {
            throw Error('Incorrect password')
        }

        const token = createToken(username)
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