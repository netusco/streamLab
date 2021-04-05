import { model, Schema } from 'mongoose'

import { ROLES } from '../../../utils'

const UserSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  displayName: String,
  providerId: String,
  provider: String,
  role: {
    type: String,
    default: ROLES.user,
  },
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