const logger = (req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`)
  console.log(`Body: ${JSON.stringify(req.body)}`)
  console.log(`Query: ${JSON.stringify(req.query)}`)
  next()
}

export default logger
