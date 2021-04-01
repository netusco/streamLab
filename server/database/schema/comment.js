import { model, Schema } from 'mongoose'

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author : { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        index: true,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'}] 
  });

  const CommentModel = model('Comment', CommentSchema)
  
  export default CommentModel