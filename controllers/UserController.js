const User = require('../models/User')
const { validationResult } = require('express-validator');
const gravatar = require('gravatar')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/JWT')

const register = async (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body

  try {
    const error = validationResult(req)
    if (!error.isEmpty()) throw { name: 'VALIDATION_ERROR', errors: error.errors }

    let user = await User.findOne({ email })
    if ( user ) throw { name: "BAD_REQUEST_EMAIL_EXIST" }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    
    user = new User({
      name,
      email,
      password,
      avatar
    })
    user.password = await hashPassword(user.password)
    // Save to database
    await user.save()

    const payload = {
      id: user.id,
      email: user.email
    }
    const access_token = signToken(payload)

    res.status(200).json({
      message: 'User registered',
      access_token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register
}