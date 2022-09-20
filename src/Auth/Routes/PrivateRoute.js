import React from 'react'
import { Navigate, Outlet } from 'react-router';

export default function PrivateRoute ({userData ,isAllowed, children, redirectPath = '/login'}){

  if(!isAllowed && userData === undefined)
  {
    return <></>
  }else if(!isAllowed)
  {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
