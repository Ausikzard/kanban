const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } 
    else if (error.name === 'MongoServerError') {
      if (error.code === 11000) {
        // 由用户名重复引起的错误
        return response.status(400).json({ error: 'expected `username` to be unique' })
      }
      return response.status(400).json({ error: 'Database error', details: error.message })
    } 
    // else if (error.name === 'JsonWebTokenError') {
    //   return response.status(401).json({ error: 'invalid token' })
    // }
    next(error);
  };

module.exports = { errorHandler }