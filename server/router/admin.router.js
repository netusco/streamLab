import passport from "passport"
import { to } from 'await-to-js'

import { checkIsInRole } from '../auth/utils'
import { ROLES } from '../../utils'




function Router(app, handle) {
    const adminAuth = [
        passport.authenticate('jwt', { failureRedirect: '/login' }),
        checkIsInRole(ROLES.Admin)
    ];

    app.get('/admin', ...adminAuth, (req, res) => handle(req, res))
    app.get('/admin/users', ...adminAuth, (req, res) => handle(req, res))
    app.get('/admin/users/:id', ...adminAuth, (req, res) => handle(req, res))
    app.get('/admin/events', ...adminAuth, (req, res) => handle(req, res))
}

export default Router