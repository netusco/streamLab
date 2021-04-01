import { model, Schema } from 'mongoose'

const ChatMessageSchema = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const ChatMessageModel = model('ChatMessage', ChatMessageSchema)

export default ChatMessageModel