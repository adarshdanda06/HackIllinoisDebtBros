const express = require('express')
const balanceRoutes = require('./routes/balance')
const { connect } = require('mongoose')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 



app.use('/api/balance', balanceRoutes)


app.listen(4000, () => {
    console.log('Server listening on port 4000')
})


module.exports = {
    getDriver: () => driver
};





/*



const initializeDriver = async () => {
    try {

        
        // Verify connection
        let info = await driver.getServerInfo();
        console.log('Connection established successfully: ', info);
        
        // Start the server after driver is initialized

        
    } catch (err) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`);
        process.exit(1); // Exit if we can't connect to the database
    }
};

// Initialize driver
initializeDriver();
// Properly initialize the driver


// routes
app.use('/api/balance', balanceRoutes);

// Export a module that provides a session method
module.exports = {
    session: () => {
        if (!driver) {
            throw new Error('Driver not initialized');
        }
        return driver.session();
    },
    close: async () => {
        if (driver) {
            await driver.close();
        }
    }
};

*/