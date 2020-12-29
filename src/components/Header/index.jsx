import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <NavLink exact to="/" className={`${classes.link} ${classes.title}`}>
            <Button color="inherit">HOME</Button>
          </NavLink>

          <NavLink to="/rendering" className={classes.link}>
            <Button color="inherit">RENDERING</Button>
          </NavLink>

          <NavLink to="/students" className={classes.link}>
            <Button color="inherit">STUDENTS</Button>
          </NavLink>

          <NavLink to="/todos" className={classes.link}>
            <Button color="inherit">TODO</Button>
          </NavLink>

          <NavLink to="/magicbox" className={classes.link}>
            <Button color="inherit">MAGIC BOX</Button>
          </NavLink>

          <NavLink to="/posts" className={classes.link}>
            <Button color="inherit">POST</Button>
          </NavLink>

          <a
            className={classes.link}
            href="https://zingmp3.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="inherit">Go to Zing MP3</Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
