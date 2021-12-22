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

module.exports = {
  checkPost
}
