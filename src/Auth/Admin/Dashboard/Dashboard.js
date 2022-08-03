import React from 'react'
import Header from '../../../RegisterAdmision/components/Header'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import './Dashboard.css';

export default function Dashboard({userId}) {
  return (
    <div className='wrap-Admin'>
      <Header userId={userId}/>
      <div className='body-container'>
          <Sidebar/>
          <Main />
      </div>
    </div>

  )
}

