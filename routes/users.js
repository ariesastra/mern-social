const { check } = require('express-validator')
const user = require('express').Router()

// CONTROLLER
const {
  register
} = require('../controllers/UserController')


/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 */
user.post('/register', 
  
  /** @middleware Middleware Validation from express-validator */
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more character')
      .isLength({ min: 6 })
  ],
  register
)


module.exports = user