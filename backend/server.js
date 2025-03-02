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

app.use('/api/balance', balanceRoutes)
app.use('/api/user', userRoutes)


app.listen(4000, () => {
    console.log('Server listening on port 4000')
})


module.exports = {
    getDriver: () => driver
};


