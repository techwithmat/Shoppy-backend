import { SignJWT } from 'jose'

const generateJWT = async (id) => {
  const jwtConstructor = new SignJWT({ id })
  const encoder = new TextEncoder()

  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_SECRET))

  return jwt
}

export default generateJWT
