import React from 'react'
import { Navigate, Outlet } from 'react-router';

export default function PrivateRoute ({userData ,isAllowed, children, redirectPath = '/accessdenied'}){

  // console.log("-----------USERDATA" ,userData);
  //when reload? userData==null ---fix

  // if(userData === undefined)
  // {
  //   return <></>;
  // }
  // else if(userData === null)
  // {
  //   return <Navigate to={redirectPath} replace/>
  // }

  if(!isAllowed && userData === undefined)
  {
    return <></>
  }else if(!isAllowed)
  {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
