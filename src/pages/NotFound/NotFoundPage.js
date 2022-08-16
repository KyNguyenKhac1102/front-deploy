import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import "./NotFound.css"

export default function NotFound() {
  return (
    <div className='error404-wrapper'>
      <div className='label404-code'>404</div>
      <div className='content404-code'>Not Found</div>
      <div className='content404'>The resource request could not found on site!</div>
      {/* <div className='button404-wrapper'>
         <Button><Link className='link-404' to="/login">GO TO LOGIN <KeyboardTabIcon /></Link></Button>
      </div> */}
      
  </div>
  )
}
