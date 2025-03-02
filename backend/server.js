const express = require('express')
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user')
const receiptRoutes = require('./routes/receipt')

const cors = require('cors')

const app = express()

// middleware
app.use(express.json())
app.use(express.static("public"))
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/balance', balanceRoutes)
app.use('/api/user', userRoutes)
app.use('/api/receipt', receiptRoutes)

// listening for requests
app.listen(4000, () => {
    console.log('Server listening on port 4000')
})

module.exports = {
    getDriver: () => driver
};


