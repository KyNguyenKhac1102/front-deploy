import React from 'react'
import { Link } from 'react-router-dom'

export default function SwitchRole() {
  return (
      <>
      <div>SwitchRole</div>
      <div>
      <Link to="/admin">To Admin</Link>
      </div>

        <div>
        <Link to="/user">To User</Link>
        </div>
      </>
    
    
  )
}
