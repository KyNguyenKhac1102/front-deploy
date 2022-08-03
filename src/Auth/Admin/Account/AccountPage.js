import React from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import Header from '../../../RegisterAdmision/components/Header'
import AccountMain from './components/AccountMain'

export default function AccountPage({userId}) {
  return (
    <div className='wrap-Admin'>
      <Header userId={userId}/>
      <div className='body-container'>
          <Sidebar />
          <AccountMain />
      </div>
    </div>
  )
}
