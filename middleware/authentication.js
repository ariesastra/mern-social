const { verifyToken } = require('../helpers/JWT')
const User = require('../models/User')

const authentication = async (req, res, next) => {
  const token = req.header('x-auth-token')
  
  try {
    if ( !token ) throw { name: "UNAUTHORIZE_TOKEN"}
    
    const authenticate = verifyToken(token)
    if ( !authenticate ) throw { name: "UNAUTHORIZE_TOKEN" }

    const user = await User.findOne({
      email: authenticate.email
    })
    if ( !user ) throw { name: "UNAUTHORIZE_TOKEN" }

    req.auth = {
      id: user.id,
      email: user.email
    }
    
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authentication }