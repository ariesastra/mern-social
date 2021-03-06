const profile = require('express').Router()
const { authentication } = require('../middleware/authentication')
const { check } = require('express-validator')
const { 
  getProfileData, 
  postProfileData,
  getAllProfile,
  getProfileByUserId,
  deleteProfile,
  addProfileExperience,
  deleteExpById, 
  addEducationProfile,
  deleteEducation,
  getGithubProfile
} = require('../controllers/ProfileController')

/**
 * @route   POST api/profile/me
 * @desc    Get Profile data
 * @access  Private
 */
profile.get('/me',
 authentication,
 getProfileData
)

/**
 * @route   POST api/profile
 * @desc    Create or Update user profile
 * @access  Private
 */
profile.post('/',
  /**@middleware for authentication and validation */
  authentication,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skill is required').not().isEmpty()
  ],
  postProfileData
)

/**
 * @route   GET api/profile
 * @desc    Get all profile
 * @access  Public
 */
profile.get('/',
  getAllProfile
)

/**
 * @route   GET api/profile/user/:user_id
 * @desc    Get profile by User Id
 * @access  Public
 */
profile.get('/user/:user_id',
  getProfileByUserId
)

/**
 * @route   DELETE api/profile
 * @desc    Delete profile, user, & posts
 * @access  Private
 */
profile.delete('/',
  /**@middleware authentication */
  authentication,
  deleteProfile
)

/**
 * @route   PUT api/profile/experience
 * @desc    Add Profile Experience
 * @access  Private
 */
profile.put('/experience',
  /**@middleware authentication */
  authentication,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ],
  addProfileExperience
)

/**
 * @route   DELETE api/profile/experience/:exp_id
 * @desc    Delete Profile Experience
 * @access  Private
 */
profile.delete('/experience/:exp_id',
  /**@middleware authentication */
  authentication,
  deleteExpById
)

/**
 * @route   PUT api/profile/education
 * @desc    Add Education to profile
 * @access  Private
 */
profile.put('/education',
  /**@middleware authentication */
  authentication,
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ],
  addEducationProfile
)

/**
 * @route   DELETE api/profile/education/:edu_id
 * @desc    Delete Education from profile
 * @access  Private
 */
profile.delete('/education/:edu_id',
  /**@middleware authentication */
  authentication,
  deleteEducation
)

/**
 * @route   GET api/profile/github/:username
 * @desc    Get User repos from github
 * @access  Public
 */
profile.get('/github/:username',
  getGithubProfile
)

module.exports = profile