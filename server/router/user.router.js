import passport from "passport"


function Router(app, handle) {
    const authenticate = passport.authenticate('jwt', { failureRedirect: '/login' })
    const loadPage = (req, res) => handle(req, res)


    app.get('/home', authenticate, loadPage)
    app.get('/profile', authenticate, loadPage)
}

export default Router