
import { useEffect } from 'react'
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'
import {Link} from 'react-router-dom'
import { UserContext } from './UserContext';
import AppBar from "@mui/material/AppBar";
import { Toolbar } from '@mui/material';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { makeStyles } from 'react';



export default function Header() {

    const{setUserInfo, userInfo} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            method : 'POST',
            credentials : 'include'
        });
        setUserInfo(null)
        navigate('/')
        
    }

// Define custom styles
const headerStyle = {
    backgroundColor: 'black',
    width: '100%',
    position: 'fixed',
    margin: 0,
    top: 0,
    left: 0,
    right: 0,
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '350px'
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '16px',
  };

    const userName = userInfo?.username;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };
      

    return(
        <AppBar position = "fixed" style={headerStyle}>
            <Toolbar style={toolbarStyle}>
                <Link to = "/" style = {logoStyle} className = "logo">My Blog</Link>
            <div className='desktop-nav'>
            <nav>
                {userName && (
                    <nav style = {navStyle}>
                    <span>Hello, {userName}</span>
                    <Link to = "/create" > Create new article</Link>
                    <a onClick = {logout}> Logout </a>
                    </ nav>
                )}
                {!userName && (
                    <>
                        <nav style = {navStyle}>
                        <Link to = "/login" >Login</Link>
                        <Link to = '/register'>Register</Link>                         
                        </nav>

                    </>

                )}
            </nav>
            </div>
            <div className = "mobile-nav">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>


                <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
                    <List>
            {userName && (
              <>
                <ListItem>
                  <ListItemText primary={`Hello, ${userName}`} />
                </ListItem>
                <ListItem button component={Link} to="/create">
                  <ListItemText primary="Create new article" />
                </ListItem>
                <ListItem button onClick={logout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
            {!userName && (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
            </List>
           </ Drawer>
            </div>

            </Toolbar>
        </AppBar>
    )

}
