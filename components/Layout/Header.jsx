import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles';

import useAuth from '../../hooks/useAuth'

const HEADER_TABS = {
  events: {
    url: '/events',
    key: 0
  },
  users: {
    url: '/users',
    key: 1
  }
}

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header({ classes, onDrawerToggle }) {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // select the initial tab based on url path
    for (let hTab of Object.values(HEADER_TABS)) {
      if (router.pathname.indexOf(hTab.url) > -1) {
        setSelectedTab(hTab.key)
        break
      }
    }
  }, [])

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
                <Link href={`${process.env.BASE_API_URL}/auth/logout`}>Logout</Link>
            </Grid>
            <Grid item>
              <Tooltip title={`${user?.notifications?.length ? user?.notifications?.length : 'No'} Alerts`}>
                <IconButton color="inherit">
                  <Badge badgeContent={user?.notifications?.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={() => router.push("/profile")} className={classes.iconButtonAvatar}>
                <Avatar src="/default_avatar.svg" alt={`${user?.firstName || ''}`.toUpperCase()} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Button className={classes.button} variant="outlined" color="inherit" size="small">
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={selectedTab} textColor="inherit">
          <Tab textColor="inherit" label="Events"  onClick={() => { setSelectedTab(HEADER_TABS.events.key); router.push(`/admin${HEADER_TABS.events.url}`) }} />
          <Tab textColor="inherit" label="Users"  onClick={() => { setSelectedTab(HEADER_TABS.users.key); router.push(`/admin${HEADER_TABS.users.url}`)} } />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}


export default withStyles(styles)(Header);