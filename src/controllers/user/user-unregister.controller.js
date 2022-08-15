import User from '#Models/user.model.js'
import { compare } from 'bcrypt'

const userUnregisterController = async (req, res) => {
  const { id } = req
  const { password } = req.body

  const existingUserById = await User.findById(id)

  if (!existingUserById) {
    return res.status(401).json({ error: 'User not found' })
  }

  const isPasswordValid = await compare(password, existingUserById.password)

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Creditentials are invalid' })
  }

  await existingUserById.delete()

  return res.status(200).json({ message: 'User deleted' })
}

export default userUnregisterController
