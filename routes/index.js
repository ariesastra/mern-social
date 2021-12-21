const route = require('express').Router()

/**
 * @route   GET api/users
 * @desc    Test route
 * @access  Public
 */
route.get('/', (req, res) => res.status(200).json('server is running'))

// DEFINE ROUTES
route.use('/api/users', require('./users'))
route.use('/api/auth', require('./auth'))
route.use('/api/profile', require('./profile'))
route.use('/api/posts', require('./posts'))

module.exports = route
