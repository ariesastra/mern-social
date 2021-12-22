const { validationResult } = require('express-validator')
const User = require('../models/User')
const Post = require('../models/Post')
const Profile = require('../models/Profile')

const createPost = async (req, res, next) => {
  const {
    text
  } = req.body
  const { id } = req.auth

  try {
    const error = validationResult(req)
    if (!error.isEmpty()) throw { name: 'VALIDATION_ERROR', errors: error.errors }

    const user = await User.findById(id).select('-password')

    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
      user: id
    }

    const post = new Post(newPost)
    await post.save()

    res.status(201).json({
      message: "Post created",
      post
    })
  } catch (error) {
    next(error)
  }  
}

module.exports = {
  createPost
}