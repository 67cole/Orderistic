// React import
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { auth } from "../firebase";
// import route navigation function
import { Link, useNavigate } from "react-router-dom";

function Nav () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        setIsLoggedIn(!!user);
      });
    }, []);
    const navigate = useNavigate();
    const previousOrder = () => {
      navigate('previous');
    }
    const home = () => {
      navigate('/');
    }
    const cart = () => {
      navigate('/cart');
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={home}>
                Orderistic
              </Typography>
              {isLoggedIn ? (<><Button color="inherit" onClick={previousOrder}>Previous Orders</Button><Button color="inherit">Request Assistance</Button><Button color="inherit" onClick={cart}>Cart</Button></>) : (<Button color="inherit">Login</Button>)
              }
            </Toolbar>
          </AppBar>
        </Box>
      );
}
export default Nav;