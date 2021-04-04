import { EventModel } from '../schema'

async function getAllEvents() {
  return await EventModel.find({}).exec()
}
async function getEventById(id) {
  const event = await EventModel.findById(id).exec()
  return event
}

export {
    getAllEvents,
    getEventById,
}