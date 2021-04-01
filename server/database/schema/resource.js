import { model, Schema } from 'mongoose'

const ResourceSchema = new Schema({
  info: {
    title: String,
    description: String,
    image: String,
    thumbnail: String,
  },
  url: {
    type: String,
    required: true,
  },
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
})

const ResourceModel = model('Resource', ResourceSchema)

export default ResourceModel