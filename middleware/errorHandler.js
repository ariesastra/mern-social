const errorHandler = (err, req, res, next) => {
  console.log(err);

  let status = 500
  let message = 'Internal Server Error'

  if (err.name === 'VALIDATION_ERROR') {
    status = 400
    message = []
    err.errors.forEach(el => {
      delete el.value
      delete el.param
      delete el.location
      message.push(el.msg)
    })
  } else if (err.name === "BAD_REQUEST_EMAIL_EXIST") {
    status = 400
    message = "Email already Exists"
  } else if (err.name === "JsonWebTokenError") {
    status = 401
    message = "Unauthorize token"
  } else if (err.name === "UNAUTHORIZE_TOKEN") {
    status = 401
    message = "No Token, authorization denied"
  } else if (err.name === "INVALID") {
    status = 400
    message = "Invalid Credentials"
  } else if (
    err.name === "INVALID_PROFILE"
    || err.name === "CastError"
  ) {
    status = 400
    message = "There is no profile for this user"
  }

  res.status(status).json({
    errors: message
  })
}

module.exports = errorHandler
