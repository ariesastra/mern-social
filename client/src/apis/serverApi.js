const axios = require('axios')

const server = axios.create({
  baseURL: 'http://localhost:5000'
})

module.exports = server