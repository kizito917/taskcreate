const express = require('express')
const mongoose  = require('mongoose');
const url = process.env.DATABASE_CONN_URL

//creating a connection
const conn = mongoose.connect(url, { useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true })
.then(() => console.log("Database successfully connected"))
.catch(err => console.log('error in database connection'))

module.exports = conn