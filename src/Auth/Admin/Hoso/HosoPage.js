import React from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import Header from '../../../RegisterAdmision/components/Header'
import HosoMain from './components/HosoMain'

export default function HosoPage({userId}) {
  return (
    <div className='wrap-Admin'>
      <Header userId={userId}/>
      <div className='body-container'>
          <Sidebar className='sidebar-Admin'/>
          <HosoMain />
      </div>
    </div>
  )
}
