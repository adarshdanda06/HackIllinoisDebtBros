const express = require('express')
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user')
const recieptRoutes = require('./routes/reciept')

const app = express()

// middleware
app.use(express.json())
app.use(express.static("public"))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/balance', balanceRoutes)
app.use('/api/user', userRoutes)
app.use('/api/reciept', recieptRoutes)

// listening for requests
app.listen(4000, () => {
    console.log('Server listening on port 4000')
})

module.exports = {
    getDriver: () => driver
};


