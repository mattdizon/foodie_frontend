import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Nav extends React.Component{

    render(){

        return(

            <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon  iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText="Sign out" />
            <MenuItem primaryText="Sign In" />
        </MenuIcon>
        </IconButton>
        <NavLink to ="/signup" className = "nav-left">
        <Typography variant="h6" color="inherit" >
          Sign Up
        </Typography>
        </NavLink>
        <NavLink to = "/signin" className = "nav-left">
        <Button color="inherit">Sign In</Button>
        </NavLink>
        <NavLink to = "/profile" className = "nav-left">
            <Button color="inherit">account</Button>
        </NavLink>
        <NavLink to = "/create-recipe" className = "nav-left">
            <Button color="inherit">Create Recipe</Button>
        </NavLink>
        <NavLink to = "/recipes" className = "nav-left">
            <Button color="inherit">Recipes</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
        )
    }
}
export default Nav
