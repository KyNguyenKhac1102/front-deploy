import React from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import Header from '../../../RegisterAdmision/components/Header'
import TruongMain from './components/TruongMain'

export default function TruongPage({userId}) {
  return (
    <div className='wrap-Admin'>
      <Header userId={userId}/>
      <div className='body-container'>
          <Sidebar className='sidebar-Admin'/>
          <TruongMain />
      </div>
    </div>
  )
}
