const express = require('express')
const userRoutes = require('./routes/user')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/user', userRoutes)


// connecting to db
app.listen(4000, () => {
    console.log('currently listening on port 4000')
})