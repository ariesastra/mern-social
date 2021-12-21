const jwt = require('jsonwebtoken')

const signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: 360000 // in milisecond
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = { signToken, verifyToken }