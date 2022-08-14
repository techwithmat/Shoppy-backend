import User from '#Models/user.model.js'
import { compare } from 'bcrypt'
import generateJWT from '#Utils/generateJWT.js'

const userLoginController = async (req, res) => {
  const { email, password } = req.body

  const existingUserbyEmail = await User.findOne({ email })

  if (!existingUserbyEmail) {
    return res.status(401).json({ error: 'Password or email is incorrect' })
  }

  const checkPassword = await compare(password, existingUserbyEmail.password)

  if (!checkPassword) {
    return res.status(401).json({ error: 'Password or email is incorrect' })
  }

  const userID = existingUserbyEmail.id
  const jwt = await generateJWT(userID)

  return res.status(200).json({ jwt })
}

export default userLoginController
