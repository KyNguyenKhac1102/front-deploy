import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import React from 'react';
import "./Header.css";

export default function Header({userId}) {

  const handleLogout = () => {
    Cookies.remove("jwt");
    
    window.location.href = "/login";
  }

  return (
    <div className='header-wrapper'>
      <div className='header-label'>
          <div className='header-logo'>React</div>
          <img className='header-image' src='/logo192.png' alt='logo'/>
      </div>
      <div className='header-logout'>
      {userId ? <Button color='inherit' onClick={handleLogout}>Log out</Button> : <Button color="inherit">Login</Button>}
      </div>
    </div>
  )
}
