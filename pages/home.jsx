import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  }
}))

const Home = () => {
  const classes = useStyles({})
  return (
    <main className={classes.layout}>
    <Link href={`${process.env.BASE_API_URL}/auth/logout`}>Logout</Link>
      <Paper className={classes.paper} elevation={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Home
          </Typography>
          <Typography component="p" gutterBottom>
            Welcome, you are logged in!
          </Typography>
        </Box>
      </Paper>
    </main>
  )
}

export default Home