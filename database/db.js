const pool = require('pg').Pool

const pool = new Pool({
    user : "postgres",
    password : "HackDebtBros2025",
    host : "debt-bro-db-instance.cm9kia4imhy2.us-east-1.rds.amazonaws.com",
    port : 5432,
    database : "initial_db"
})

module.exports = pool;
