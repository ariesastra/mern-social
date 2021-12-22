const posts = require('express').Router()
const { check } = require('express-validator')
const { authentication } = require('../middleware/authentication')
const {
  createPost,
} = require('../controllers/PostsController')

/**
 * @route   POST api/posts
 * @desc    Post posts data
 * @access  Private
 */
posts.post('/',
  authentication,
  [
    check('text', 'Text is required').not().isEmpty(),
  ],
  createPost
)

module.exports = posts
