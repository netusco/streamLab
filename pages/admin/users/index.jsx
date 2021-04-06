import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import useAuth from '../../../hooks/useAuth'
import authReqHeader from '../../../utils/authReqHeader'
import { Router } from 'next/router';


const fetcher = url => axios.get(url, authReqHeader)
    .then(res => res.data)

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

const UsersList = (props) => {
  const { user } = useAuth()
  const router = useRouter()
  const { data, error } = useSWR('http://localhost:3000/api/users', fetcher)
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  
  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <Paper className={styles.paper}>
      <AppBar className={styles.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={styles.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  className: styles.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={styles.addUser}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={styles.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={styles.contentWrapper}>
        {!data ? (
          <Typography color="textSecondary" align="center">
            No users for this project yet
          </Typography>
        ) : (
          <List dense className={styles.root}>
            {data.map(({ email, _id: id, firstName }) => {
              const labelId = `checkbox-list-secondary-label-${id}`;
              return (
                <ListItem key={id} onClick={ () => router.push(`/admin/users/${id}`)} button>
                  <ListItemAvatar>
                    <Avatar src="/default_avatar.svg" alt={`${firstName || ''}`.toUpperCase()} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={firstName} />
                  <ListItemText primary={email} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(id)}
                      checked={checked.indexOf(id) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    </Paper>
  )
}
export default withStyles(styles)(UsersList);