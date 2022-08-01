import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BlockIcon from '@mui/icons-material/Block';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import "./Unauthorized.css"


export default function AccessDenied() {
  return (
    <div className='error401-wrapper'>
      <div className='dot'>
        <BlockIcon color="primary" className='icon-401'/>
      </div>
      <div>
        <div className='label401-code'>401</div>
        <div className='content401-code'>You don't have access to this site</div>
        <Button><Link className='link-401' to="/login">GO TO LOGIN <KeyboardTabIcon /></Link></Button>
      </div>
    </div>
  )
}
