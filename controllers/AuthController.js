const User = require('../models/User')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/JWT')
const { validationResult } = require('express-validator')

const getAuthenticateUser = async (req, res, next) => {
  const { id } = req.auth

  try {
    const user = await User.findById(id).select('-password')

    res.status(200).json({
      user
    })
  } catch (error) {
    next(error)
  }
}

const doLogin = async (req, res, next) => {
  const {
    email, 
    password
  } = req.body

  try {
    const error = validationResult(req)
    if (!error.isEmpty()) throw { name: 'VALIDATION_ERROR', errors: error.errors }

    let user = await User.findOne({ email })
    if( !user ) throw { name: "INVALID" }

    const compare = await comparePassword(password, user.password)
    if ( !compare ) throw { name: "INVALID" }

    const payload = {
      id: user.id,
      email: user.email
    }
    const access_token = signToken(payload)

    res.status(200).json({
      access_token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAuthenticateUser,
  doLogin
}