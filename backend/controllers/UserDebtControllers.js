// create new user
const createUser = async (req,res) => {
    try {
        const { username, password } = req.body

        /*
        Query To Create
        x = Randomly generated: random
        CREATE (u1: User {username: $username, password: $password, group: $groupID})
        */
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


}


const changeAmountOwed = async (req, res) => {
    const { username, otherUsername, amount } = req.body
    // need to do + or - a value
    /*
    MATCH (u1: User {username: $username})-[r:MONEY_OWED]->(u2: User {username: $otherUsername})
    SET r.amount = $amount
    */

}

const youOweOthers = async (req, res) => {
    const { username } = req.params
    /*
        MATCH (user:User {userId: 'specificUserId'})-[r:MONEY_OWED]->(friend)
        RETURN user.name AS userName, friend.name AS friendName, r.amount
    */
}


const othersOweYou = async (req, res) => {
    const { username } = req.params
    /*
        MATCH (otherUser:User)-[r:MONEY_OWED]->(user:User {username: 'username'})
        RETURN user.username AS userName, otherUser.name AS friendName, r.amount
    */
}

const getUsersInGroupByID = async (req, res) => {
    const { code } = req.params
    /*
    MATCH (user:User {groupId: $groupId})
    RETURN user
    */

}



module.exports = (
    createUser,
    getUsersInGroupByID,
    changeAmountOwed,
    joinGroup,
    youOweOthers,
    othersOweYou
)





// Done: 

// createUser
// joinGroup(updateUserGroupID and initialize all edges) Need to first check valid groupID
// whosInGroupByID
// changeAmountOwed
// howMuchEveryoneInGroupOwesYou
// howMuchYouOweEveryone






// edges are called moneyOwed
// weights/amount on edges are called amount



