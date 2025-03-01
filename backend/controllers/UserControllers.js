const pool = require('../../database/db')

// cerate new user
const createUser = async (req,res) => {
    try {
        const { username, password, email, code } = req.body
        const User = await pool.query(
            "INSERT INTO user_table (username, password, email, code) VALUES($1, $2, $3, $4)", 
            [username, password, email, code]
        )
        res.status(200).json(User)
    } catch (error) {
        res.status(400).json(error.message)
    } 
}

const getUsersInGroup = async (req, res) => {
    const { code } = req.params
    const Users = await pool.query(
        "SELECT * FROM user_table WHERE code = $1"
        [code]    
    )
    res.status(200).json(Users)
}

const getUserByName = async (req, res) => {
    const { username } = req.params
    const User = await pool.query(
        "SELECT * FROM user_table WHERE username = $1", 
        [username]
    )
    res.status(200).json(User)
}

const updateUser = async (req, res) => {
    const { username, password, email, code } = req.body
    const User = await pool.query(
        "UPDATE user_table SET (password, email, code) = ($1, $2, $3) WHERE username = $4"
        [password, email, code, username]
    )
    res.status(200).json(User)
}

const deleteUser = async (req, res) => {
    const { username } = req.params
    const User = pool.query(
        "DELETE FROM username * WHERE username = $1",
        [username]
    )
}

module.exports = (
    createUser,
    getUsersInGroup,
    getUserByName,
    updateUser,
    deleteUser
)