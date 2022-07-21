import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import Cookies from 'js-cookie';


export default function Header({userId}) {

  const handleLogout = () => {
    Cookies.remove("jwt");
    
    window.location.href = "/login";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dang Ky Xet Tuyen
          </Typography>
          {userId ? <Button color='inherit' onClick={handleLogout}>Log out</Button> : <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box> 
  )
}
