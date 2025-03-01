const pool = require('../../database/db')

// cerate new user
const createUser = async (req,res) => {
    const { username, password, email, code } = req.body
    const User = await pool.query(
        "INSERT INTO User (username, password, email, code) VALUES($1, $2, $3, $4)", 
        [username, password, email, code]
    )
}

const getUser = async (req, res) => {

}