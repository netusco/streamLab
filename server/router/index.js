import authRoutes from './auth.routes'
import apiRouter from './api.router'
import adminRouter from './admin.router'
import userRouter from './user.router'

function Router(app, handle) {
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes)
  apiRouter(app, handle)
  adminRouter(app, handle)
  userRouter(app, handle)
}

export default Router