import { model, Schema } from 'mongoose'
import IntervalModel from './interval'

const EventSchema = new Schema({
  info: {
    title: {
      type: String,
      required: 'Please fill event name',
    },
    description: String,
    startDate: {
      type: Date,
      required: 'Please select a start date for this event'
    },
    endDate: {
      type: Date,
      required: 'Please select an end date for this event',
      index: true
    },
    coverImage: String,
    thumbnail: String,
  },
  type: {
    type: String,
    default: 'default',
    enum: ['meeting', 'default'] 
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
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  schedule: {
    type: [IntervalModel.Schema]
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  recordings: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  visible: {
    type: Boolean,
    default: true
  },
  public: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const EventModel = model('Event', EventSchema)

export default EventModel