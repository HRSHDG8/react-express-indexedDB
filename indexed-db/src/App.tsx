import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { db } from './service/app-db.service'
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { Blog } from './Blog'
const { useEffect, useState } = React;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  spin: {
    display: 'flex',
    justifyContent: 'center'
  },
}));

function App() {
  const [user, setUser] = useState<any>(null)
  const classes = useStyles();

  useEffect(() => {
    const dbInstance = db('appDb')
    dbInstance.then(idb => {
      idb.get('userDetails', 'login').then(data => {
        if (data !== null) {
          setUser(data)
        }
      })
    })
    axios.get('http://localhost:8080/user')
      .then(resp => {
        setUser(resp.data)
        dbInstance.then(idb => {
          idb.add('userDetails', resp.data, 'login')
        })
      })
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Micro Blog
          </Typography>
          <Button color="inherit">{user ? user.name : <CircularProgress color={'secondary'} />}</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.spin}>
        {
          user ? <Blog user={user} /> : < div style={{ width: '60vw' }}><Skeleton height={100} /><Skeleton /><br /><Skeleton height={100} /><Skeleton /></div>
        }
      </div>
    </div>
  );
}

export default App;
