import User from '#Models/user.model.js'
import { hash } from 'bcrypt'
import generateJWT from '#Utils/generateJWT.js'

const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body

  const existingUserbyEmail = await User.findOne({ email })

  if (existingUserbyEmail) {
    return res.status(409).json({ error: 'User already exists' })
  }

  const hashedPassword = await hash(password, 10)

  const user = new User({
    name,
    email,
    password: hashedPassword
  })

  const userSaved = await user.save()
  const userID = userSaved.id

  const jwt = await generateJWT(userID)

  return res.status(201).json({ message: 'User created', jwt })
}

export default userRegisterController
