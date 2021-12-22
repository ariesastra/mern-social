const Post = require('../models/Post')

const checkPost = async (req, res, next) => {
  const { id } = req.auth
  const { id:PostId } = req.params
  try {
    const post = await Post.findById(PostId)
    if ( !post ) throw { name: "NOT_FOUND" }
    if ( post.user.toString() !== id ) throw { name: "NOT_AUTHORIZE" }

    next()
  } catch (error) {
    next(error)
  }
}

const checkLikes = async (req, res, next) => {
  const { id } = req.params
  const { id: UserId } = req.auth
  try {
    const post = await Post.findById(id)
    if ( !post ) throw { name: "NOT_FOUND" }
    const likeUser = post.likes.filter(like => like.user.toString() === UserId)
    if ( likeUser.length > 0 ) throw { name: "ALREADY_LIKED" }

    next()
  } catch (error) {
    next(error)
  }
}

const checkUnlike = async (req, res, next) => {
  const { id } = req.params
  const { id: UserId } = req.auth
  try {
    const post = await Post.findById(id)
    const likeUser = post.likes.filter(like => like.user.toString() === UserId)
    if ( likeUser.length < 1 ) throw { name: "FORBIDDEN" }

    next()
  } catch (error) {
    next(error)
  }
}

const checkDeleteComment = async (req, res, next) => {
  const { id:PostId, comment_id } = req.params
  const { id:UserId } = req.auth

  try {
    const post = await Post.findById(PostId)

    // Pull out comments
    const comment = post.comments.find(comment => comment.id === comment_id)
    // Make sure comment exist
    if ( !comment ) throw { name: "NOT_FOUND" }
    // Check comment is owning by login user
    if ( comment.user.toString() !== UserId ) throw { name: "NOT_AUTHORIZE" }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkPost,
  checkLikes,
  checkUnlike,
  checkDeleteComment
}
