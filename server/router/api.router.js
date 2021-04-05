import passport from "passport"
import { to } from 'await-to-js'

import { checkIsInRole } from '../auth/utils'
import { ROLES } from '../../utils'
import { getAllUsers, getUserById } from '../database/user/get'
import { getAllEvents, getEventById } from '../database/event/get'
import { createNotification, getNotificationsByUserId, getNotVisitedNotificationsByUserId } from '../database/notification'




function Router(app, handle) {
    const auth = passport.authenticate('jwt', { failureRedirect: '/login' })
    const adminAuth = [
        auth,
        checkIsInRole(ROLES.Admin)
    ];

    app.get('/api/users/me', auth,
        async (req, res) => {
            const [err, notifications] = await to(getNotVisitedNotificationsByUserId(req.user.id))

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error retrieving data from the db' })
            }

            const result = { user: req.user, notifications }

            return res
                .status(200)
                .json(result)
        }
    );

    app.get('/api/users', ...adminAuth,
        async (req, res) => {
            const [err, users] = await to(getAllUsers())

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error retrieving data from the db' })
            }

            return res
                .status(200)
                .json(users)
        }
    );


    app.get('/api/users/:id', ...adminAuth,
        async (req, res) => {
            const [err, user] = await to(getUserById(req.params.id))

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error retrieving data from the db' })
            }

            return res
                .status(200)
                .json(user)
        }
    );

    app.get('/api/events', ...adminAuth,
        async (req, res) => {
            const [err, events] = await to(getAllEvents())

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error retrieving data from the db' })
            }

            return res
                .status(200)
                .json(events)
        }
    );

    app.get('/api/events/:id', ...adminAuth,
        async (req, res) => {
            const [err, event] = await to(getEventById(req.params.id))

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error retrieving data from the db' })
            }

            return res
                .status(200)
                .json(event)
        }
    );

    app.get('/api/notifications/user/:id',
        async (req, res) => {
            const [err, notifications] = await to(getNotificationsByUserId(req.params.id))

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error retrieving data from the db' })
            }

            return res
                .status(200)
                .json(notifications)
        }
    )

    app.get('/api/notifications/create', auth, 
        async (req, res) => {
            const content = 'this is a test notification'
            const { user } = req

            const [err, notification] = await to(createNotification({
                content,
                type: 'info',
                user: user.id,
            }))

            if (err) {
                console.error(err)
                return res.status(500).json({ success: false, data: 'Error while creating a notification' })
            }

            return res
                .status(200)
                .json(notification)
        }
    )
}

export default Router