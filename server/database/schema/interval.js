import { model, Schema } from 'mongoose'

const IntervalSchema = new Schema({
    title: {
      type: String,
      default: '',
      trim: true,
      required: true
    },
    description: {
      type: String,
      default: '',
      trim: true,
      required: false
    },
    type: {
      type: String,
      default: 'general',
      trim: true,
      required: false
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: false
    }
});

const IntervalModel = model('Interval', IntervalSchema)

export default IntervalModel;