import { UserModel } from '../schema'

async function getAllUsers() {
  return await UserModel.find({}).exec()
}
async function getUserById(id) {
  const user = await UserModel.findById(id).exec()
  return user
}

async function getUserByEmail(email) {
  return await UserModel.findOne({ email }).exec()
}

async function getUserByProviderId(providerId) {
  return await UserModel.findOne({ providerId }).exec()
}

export {
  getUserById, 
  getUserByEmail, 
  getUserByProviderId,
  getAllUsers,
}