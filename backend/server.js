const express = require('express')
const balanceRoutes = require('./routes/balance')
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
/*
const connect = (async () => {
    const URI = 'neo4j+s://7d1a0d62.databases.neo4j.io'
    const USER = 'neo4j'
    const PASSWORD = 'SYJog0Ps7HJLMg6cpGSwGxftlfuIjdqreFewtbMaIP8'
    let driver;
  
    try {
      driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
      const serverInfo = await driver.getServerInfo()
      console.log('Connection established')
      console.log(serverInfo)
    } catch(err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    }
})();*/

module.exports = driver;

app.listen(4000, () => {
    console.log('currently listening on port 4000')
});