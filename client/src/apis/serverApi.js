const axios = require('axios')

const server = axios.create({
  baseURL: process.env.HOST
})

module.exports = server