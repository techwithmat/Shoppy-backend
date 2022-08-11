class APIError extends Error {
  constructor (message, statusCode, errors) {
    super(message)

    this.statusCode = statusCode
    this.errors = errors
    this.message = message
  }
}

export default APIError
