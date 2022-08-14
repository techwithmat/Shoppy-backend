import { jwtVerify } from 'jose'

const jwtValidator = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET))

    req.id = payload.id

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export default jwtValidator
