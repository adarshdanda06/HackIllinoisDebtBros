const pool = require('../../database/db')

// cerate new user
const createUser = async (req,res) => {
    try {
        const { username, password } = req.body
        const User = await pool.query(


            [username, password, email, code]
        )


        /*
        Query To Create
        x = Randomly generated: random
        CREATE (u1: User {username: $username, password: $password, group: $groupID})
        */
        res.status(200).json(User)
    } catch (error) {
        res.status(400).json(error.message)
    } 
}


const joinGroup = async (req, res) => {
    const { username, group_id } = req.body
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


    res.status(200).json(User)
}


const changeAmountOwed = async (req, res) => {
    const { username, otherUsername, amount } = req.body
    // need to do + or - a value
    /*
    MATCH (u1: User {username: $username})-[r:MONEY_OWED]->(u2: User {username: $otherUsername})
    SET r.amount = $amount
    */
    res.status(200).json(User)

}

const groupOwesYou = async (req, res) => {
    const { username } = req.params
    /*
    MATCH (user:User {userId: $userId})-[r:MONEY_OWED]->()
    RETURN SUM(r.amount) AS totalAmount
    */
    res.status(200).json(User)
}

const getUsersInGroupByID = async (req, res) => {
    const { code } = req.params
    const Users = await pool.query(
        "SELECT * FROM user_table WHERE code = $1"
        [code]    
    )
    /*
    MATCH (user:User {groupId: $groupId})
    RETURN user
    */

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
    getUsersInGroupByID,
    getUserByName,
    updateUser,
    deleteUser
)




// howMuchYouOweEveryone

// Done: 

// createUser
// joinGroup(updateUserGroupID and initialize all edges) Need to first check valid groupID
// whosInGroupByID
// changeAmountOwed
// howMuchEveryoneInGroupOwesYou






// edges are called moneyOwed
// weights/amount on edges are called amount



