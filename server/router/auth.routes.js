import express from 'express'
import { to } from 'await-to-js'
import { verifyPassword, hashPassword, getRedirectUrl } from '../auth/utils'
import { login } from '../auth/strategies/jwt'
import { createUser, getUserByEmail } from '../database/user'

const router = express.Router()

router.get('/logout', function(req, res){
  req.logout();
  res.clearCookie('jwt', { path: '/' });
  res.redirect('/');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const [err, user] = await to(getUserByEmail(email))

  const authenticationError = () => {
    return res
      .status(500)
      .json({ success: false, data: "Authentication error!" })
  }
    
  if (!user) {
    console.error('No user found')
    return authenticationError()
  }

  if (!(await verifyPassword(password, user.password))) {
    console.error('Passwords do not match')
    return authenticationError()
  }

  const [loginErr, token] = await to(login(req, user))

  if (loginErr) {
    console.error('Log in error', loginErr)
    return authenticationError()
  }

  return res
    .status(200)
    .cookie('jwt', token, {
      // secure:
      //   process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https"),
      // maxAge: Date.now() + 60 * 60 * 1000 * 4,
      // domain:
      // process.env.NODE_ENV == `production`
      //   ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
      //   : "localhost"
      httpOnly: true
    })
    .json({
      success: true,
      data: getRedirectUrl(req.user.role)
    })
})

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res.status(500).json({ success: false, data: 'Enter a valid email address.' })
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).json({
      success: false,
      data: 'Password must be between 5 and 20 characters.'
    })
  }

  let [err, user] = await to(
    createUser({
      firstName,
      lastName,
      email,
      password: await hashPassword(password)
    })
  )

  if (err) {
    return res.status(500).json({ success: false, data: 'Email is already taken' })
  }

  const [loginErr, token] = await to(login(req, user))

  if (loginErr) {
    console.error(loginErr)
    return res.status(500).json({ success: false, data: 'Authentication error!' })
  }

  return res
    .status(200)
    .cookie('jwt', token, {
      // secure:
      //   process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https"),
      // maxAge: Date.now() + 60 * 60 * 1000 * 4,
      // domain:
      // process.env.NODE_ENV == `production`
      //   ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
      //   : "localhost"
      httpOnly: true
    })
    .json({
      success: true,
      data: getRedirectUrl(req.user.role)
    })
})

export default router