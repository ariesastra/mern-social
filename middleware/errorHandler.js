const errorHandler = (err, req, res, next) => {
  console.log(err.name, err);

  let status = 500
  let message = 'Internal Server Error'

  res.send(status).json({
    message
  })
}

module.exports = errorHandler
