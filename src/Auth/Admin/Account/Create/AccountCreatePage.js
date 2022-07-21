import React from 'react'
import Header from '../../../../RegisterAdmision/components/Header'
import Sidebar from '../../Dashboard/components/Sidebar'
import AccountCreate from './components/AccountCreate'

export default function AccountCreatePage({userId}) {
  return (
    <div className='wrap-Admin'>
      <Header userId={userId}/>
      <div className='body-container'>
          <Sidebar className='sidebar-Admin'/>
          <AccountCreate />
      </div>
    </div>
  )
}
