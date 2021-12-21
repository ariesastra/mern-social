require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')

// MIDDLEWARE
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTER
const route = require('./routes')
app.use(route)

// ERROR HANDLER
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler)

module.exports = app
