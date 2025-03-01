const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BalanceSchema = new Schema({
    group_code: {
        type : String,
        unique: true,
        require : true
    },
    debt: {
        type : Map,
        

    }
})
