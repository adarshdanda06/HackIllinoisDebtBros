const express = require('express')
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user')
const neo4j = require('neo4j-driver')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/balance', balanceRoutes)
app.use('/api/user', userRoutes)

// connecting to db
let driver;
try {
    const URI = 'neo4j+s://7d1a0d62.databases.neo4j.io'
    const USER = 'neo4j'
    const PASSWORD = 'SYJog0Ps7HJLMg6cpGSwGxftlfuIjdqreFewtbMaIP8'
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
} catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
}

module.exports = driver;

app.listen(4000, () => {
    console.log('currently listening on port 4000')
});