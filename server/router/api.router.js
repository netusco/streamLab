import passport from "passport"
import { to } from 'await-to-js'

import { checkIsInRole } from '../auth/utils'
import { ROLES } from '../../utils'
import { getAllUsers, getUserById } from '../database/user/get'




function Router(app, handle) {
    const adminAuth = [
        passport.authenticate('jwt', { failureRedirect: '/login' }),
        checkIsInRole(ROLES.Admin)
    ];

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
}

export default Router