import { model, Schema } from 'mongoose'

const NotificationSchema = new Schema({
  content: String,
  type: {
    type: String,
    default: 'info',
    enum: ['info', 'alert'] 
  },
  visited: {
    type: Boolean,
    default: false,
    index: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const NotificationModel = model('Notification', NotificationSchema)

export default NotificationModel