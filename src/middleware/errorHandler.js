const ERROR_HANDLERS = {
  ValidationError: () => {
    return {
      status: 400,
      message: 'Failed to validate request, title must be unique'
    }
  },
  DefaultError: () => {
    return {
      status: 500,
      message: 'Internal server error'
    }
  },
  CastError: () => {
    return {
      status: 400,
      message: 'Invalid id'
    }
  }
}

function errorHandler (err, req, res, next) {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.DefaultError
  err = handler()

  res.status(err.status).json({
    message: err.message
  })

  next()
}

export default errorHandler
