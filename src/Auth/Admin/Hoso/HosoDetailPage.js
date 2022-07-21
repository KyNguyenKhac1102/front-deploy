import React from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import Header from '../../../RegisterAdmision/components/Header'
import HosoDetailMain from './components/HosoDetailMain'

export default function HosoDetailPage({userId}) {
  return (
    <div className='wrap-Admin'>
      <Header userId={userId}/>
      <div className='body-container'>
          <Sidebar className='sidebar-Admin'/>
          <HosoDetailMain />
      </div>
    </div>
  )
}
