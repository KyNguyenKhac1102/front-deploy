import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function PublicRoute({userData, children}) {
    let navigate = useNavigate()
    useEffect(() => {
      var roles;
      if(userData !== undefined && !!userData)
      {
        roles = userData.roles;
        if(roles.includes("Admin") && roles.length === 1)
        {
          navigate("/dashboard");
        }else if(roles.includes("User") && roles.length === 1)
        {
          navigate("/");
        }else if(roles.includes("Admin") && roles.includes("User"))
        {
          //implement choosing role page...
          navigate("/dashboard");
        }else{
          navigate("/login");
        }
      }
    }, [userData, navigate])
    if(userData === undefined)
    {
      return <></>
    }else{
      return children;
    }
  }

