import { model, Schema } from 'mongoose'
import ChatMessage from './chatMessage'

const ChatSchema = new Schema({
    messages : {
        type: [ChatMessage.Schema]
    },
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

const ChatModel = model('Chat', ChatSchema)

export default ChatModel