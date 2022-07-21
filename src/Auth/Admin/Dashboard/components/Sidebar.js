import React from 'react'
import './Sidebar.css'
import { SidebarData } from './SidebarData'
import {useNavigate} from 'react-router-dom';

export default function Sidebar() {
  var navigate = useNavigate();
  return (
    <div className='sidebar-Wrapper'>
        <ul className='ul-list'>
            {SidebarData.map((item, key) => (
                <li className='row-li' 
                id={window.location.pathname.includes(item.link) ? "active" : ""}
                 key={key}
                  onClick={() => {
                    if(window.location.pathname === item.link)
                    {
                      window.location.pathname = item.link;
                    }else{
                      navigate(item.link)}
                    }
                  }>
                    <div id="icon">{item.icon}</div>
                    <div id="title">{item.title}</div>
                </li>
            ))}
        </ul>

    </div>

  )
}
