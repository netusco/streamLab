import { model, Schema } from 'mongoose'

const GroupSchema = new Schema({
    name: {
      type: String,
      required: 'Please fill Group name',
      trim: true
    },
    admins: [{
        role: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
    }],
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
  })

const GroupModel = model('Group', GroupSchema)

export default GroupModel