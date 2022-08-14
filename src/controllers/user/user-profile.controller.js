import User from '#Models/user.model.js'

const userProfileController = async (req, res) => {
  const { id } = req
  const user = await User.findById(id)

  return res.status(200).json(user)
}

export default userProfileController
