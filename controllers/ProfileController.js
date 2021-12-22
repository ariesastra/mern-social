const Profile = require('../models/Profile')
const User = require('../models/User')
const { validationResult } = require('express-validator')

const getProfileData = async (req, res, next) => {
  const { id } = req.auth

  try {
    const profile = await Profile.findOne({
      user: id,
    }).populate('user', ['name', 'avatar'])
    if ( !profile ) throw { name: "INVALID_PROFILE"}

    res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

const postProfileData = async (req, res, next) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body
  
  const { id } = req.auth

  try {
    const error = validationResult(req)
    if (!error.isEmpty()) throw { name: 'VALIDATION_ERROR', errors: error.errors }
    
    const profileFields = {}
    profileFields.user = id
    if ( company ) profileFields.company = company
    if ( website ) profileFields.website = website 
    if ( location ) profileFields.location = location 
    if ( bio ) profileFields.bio= bio 
    if ( status ) profileFields.status = status 
    if ( githubusername ) profileFields.githubusername = githubusername 
    if ( skills ) profileFields.skills = skills.split(',').map(skill => skill.trim()) 

    profileFields.social = {}
    if ( youtube ) profileFields.social.youtube = youtube 
    if ( facebook ) profileFields.social.facebook = facebook 
    if ( twitter ) profileFields.social.twitter = twitter 
    if ( instagram ) profileFields.social.instagram = instagram 
    if ( linkedin ) profileFields.social.linkedin = linkedin 

    let profile = await Profile.findOne({
      user: id
    })

    if (profile) {
      // Update Profile DB
      profile = await Profile.findOneAndUpdate(
        { user: id }, 
        { $set: profileFields }, 
        { new: true}
      )

      res.status(201).json({
        message: "Profile created",
        profile
      })
    }

    // Create Profile data
    profile = new Profile(profileFields)
    await profile.save()

    res.status(201).json({
      message: "Profile created",
      profile
    })
  } catch (error) {
    next(error)
  }
}

const getAllProfile = async (req, res, next) => {
  try {
    const all_profile = await Profile.find().populate('user', ['name', 'avatar'])

    res.status(200).json(all_profile)
  } catch (error) {
    next(error)
  }
}

const getProfileByUserId = async (req, res, next) => {
  const { user_id } = req.params
  try {
    let profile = await Profile.findOne({ user: user_id }).populate('user', ['name', 'avatar'])
    if ( !profile ) throw { name: "INVALID_PROFILE"}

    res.status(200).json(profile)
  } catch (error) {
    next(error)
  }  
}

const deleteProfile = async (req, res, next) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({
      user: req.auth.id
    })
    // remove user
    await User.findOneAndRemove({
      _id: req.auth.id
    })

    res.status(200).json({
      message: 'User Deleted'
    })
  } catch (error) {
    next(error)
  }
}

const addProfileExperience = async (req, res, next) => {
  const { id } = req.auth
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body

  try {
    const error = validationResult(req)
    if (!error.isEmpty()) throw { name: 'VALIDATION_ERROR', errors: error.errors }

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }
    const profile = await Profile.findOne({ user: id })
    profile.experience.unshift(newExp)
    await profile.save()
    
    res.status(201).json({
      message: "Experience has added",
      profile
    })
  } catch (error) {
    next(error)
  }
}

const deleteExpById = async (req, res, next) => {
  const { exp_id } = req.params
  const { id } = req.auth
  try {
    const profile = await Profile.findOne({ user: id })
    
    // Get experience Index
    const removeIndex = profile.experience
                        .map(item => item.id)
                        .indexOf(exp_id)

    profile.experience.splice(removeIndex, 1)
    await profile.save()

    res.status(200).json({
      message: `Experience deleted`
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProfileData,
  postProfileData,
  getAllProfile,
  getProfileByUserId,
  deleteProfile,
  addProfileExperience,
  deleteExpById
}