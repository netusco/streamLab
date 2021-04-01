import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  displayName: String,
  role: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  profilePhote: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const UserModel = model('User', UserSchema)

export default UserModel