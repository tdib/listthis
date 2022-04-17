const { sign, verify } = require('jsonwebtoken')
require('dotenv').config()

const createToken = user => {
  const accessToken = sign({ userID: user.userID, username: user.username }, process.env.JWT_SECRET)

  return accessToken
}

const validateToken = (req, res, next) => {
  const accessToken = req.headers['access-token']

  // No access token - user is not logged in or authenticated
  if (!accessToken) return res.status(400).json({ err: 'User is not authenticated! You must log in.' })
  if (!accessToken) console.log('NO ACCESS TOKEN!!')

  try {
    // Verify the access-token cookie using our JWT secret
    const validToken = verify(accessToken, process.env.JWT_SECRET)
    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch (err) {
    console.log('TOKEN REJECTED')
    return res.status(400).json({ err: 'Access token rejected. Please log in.' })
  }
}

module.exports = {
  createToken,
  validateToken,
}
