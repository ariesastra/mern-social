const posts = require('express').Router()
const { check } = require('express-validator')
const { authentication } = require('../middleware/authentication')
const { 
  checkPost, 
  checkLikes,
  checkUnlike,
  checkDeleteComment
} = require('../middleware/authorization')
const {
  createPost,
  getAllPost,
  getPostById,
  deletePostById,
  likePost,
  unlikePost,
  commentPost,
  deleteCommentPost
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

/**
 * @route   GET api/posts
 * @desc    Get all posts data
 * @access  Private
 */
posts.get('/',
  authentication,
  getAllPost
)

/**
 * @route   GET api/posts/:id
 * @desc    Get posts data by id
 * @access  Private
 */
posts.get('/:id',
  authentication,
  getPostById
)

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete posts data by id
 * @access  Private
 */
posts.delete('/:id',
  authentication,
  checkPost,
  deletePostById
)

/**
 * @route   PUT api/posts/like/:id
 * @desc    Like a posts data by id
 * @access  Private
 */
posts.put('/like/:id',
  authentication,
  checkLikes,
  likePost
)

/**
 * @route   PUT api/posts/unlike/:id
 * @desc    Un-Like a posts data by id
 * @access  Private
 */
posts.put('/unlike/:id',
  authentication,
  checkUnlike,
  unlikePost
)

/**
 * @route   PUT api/posts/comment/:id
 * @desc    Comment a posts data by id
 * @access  Private
 */
posts.put('/comment/:id',
  authentication,
  [
    check('text', 'Text is required').not().isEmpty()
  ],
  commentPost
)

/**
 * @route   DELETE api/posts/comment/:id/:comment_id
 * @desc    Delete Comment a posts data by post_id and comment_id
 * @access  Private
 */
posts.delete('/comment/:id/:comment_id',
  authentication,
  checkDeleteComment,
  deleteCommentPost
)

module.exports = posts
