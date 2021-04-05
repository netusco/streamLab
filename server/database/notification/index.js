import { NotificationModel } from '../schema'

async function getNotificationById(id) {
  const notification = await NotificationModel.findById(id).exec()

  return notification
}

async function getNotificationsByUserId(userId) {
  const notifications = await NotificationModel.find({ 'user': userId }).exec()
  return notifications
}

async function getNotVisitedNotificationsByUserId(userId) {
  const notifications = await NotificationModel.find({ 'user': userId, 'visited': false }).exec()
  return notifications
}

async function visitNotification(notificationId) {
  const notification = await NotificationModel.findOneAndUpdate({ 
    'id': notificationId
  }, { 
    'visited': true
  }, {
    new: true
  })
  return notification
}

async function createNotification({
  content,
  type,
  user,
}) {
  return new Promise(async (resolve, reject) => {
    return resolve(
      await NotificationModel.create({
        content,
        type,
        user,
      })
    )
  })
}

export {
    getNotificationById,
    getNotificationsByUserId,
    getNotVisitedNotificationsByUserId,
    visitNotification,
    createNotification,
}