const auth = require('express').Router()
const { authentication } = require('../middleware/authentication')
const { getAuthenticateUser, doLogin } = require('../controllers/AuthController')
const { check } = require('express-validator')

/**
 * @route   POST api/auth
 * @desc    Get One Users Data
 * @access  Private
 */
auth.get('/',
  authentication,
  getAuthenticateUser
)

/**
 * @route   POST api/auth
 * @desc    Login user and get token
 * @access  Public
 */
 auth.post('/login', 
  
 /** @middleware Middleware Validation from express-validator */
 [
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Password is required')
     .exists()
 ],
 doLogin
)

module.exports = auth
