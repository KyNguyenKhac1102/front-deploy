import axios from "axios";
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from './Auth/RegisterPage';
import Home from './RegisterAdmision/Home';

import Cookies from 'js-cookie';
import AccessDenied from './Auth/AccessDenied';

import AccountPage from "./Auth/Admin/Account/AccountPage";
import Dashboard from "./Auth/Admin/Dashboard/Dashboard";
import LoginPage from './Auth/Login/LoginPage';
import PrivateRoute from './Auth/Routes/PrivateRoute';
import PublicRoute from './Auth/Routes/PublicRoute';
import BackdropCustom from './components/FormUI/Loading/BackdropCustom';
import NotFound from './NotFound';
import AccountCreatePage from "./Auth/Admin/Account/Create/AccountCreatePage";
import HosoPage from "./Auth/Admin/Hoso/HosoPage";
import HosoDetailPage from "./Auth/Admin/Hoso/HosoDetailPage";
import TruongPage from "./Auth/Admin/Truong/TruongPage";


export default function App() {
  let navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const [userData, setUserData] = useState(undefined)

  const handleRedirectByRole = (roles) => {
    if(roles.includes("Admin") && roles.length === 1)
    {
      navigate("/dashboard");
    }else if(roles.includes("User") && roles.length === 1)
    {
      navigate("/user");
    }else if(roles.includes("Admin") && roles.includes("User"))
    {
      //implement choosing role page...
      navigate("/dashboard");
    }else{
      navigate("/login");
    }
  }



  const handleVerifyJwt = (token) => {
    setIsLoading(true);
    axios.get(`https://localhost:7210/login/cookie`, {
      headers: {
        'Authorization': "Bearer" + token
      }
    }).then(res => {
      console.log("check", res);
      let user = res.data.user;
      console.log("check role",res.data.user.roles);
      setUserData(user);
      setIsLoading(false);
      // handleRedirectByRole(user.roles);
    }).catch(err => {
      setIsLoading(false);
      console.log(err)
    });
  }

  useEffect(() => {  
    let isMounted = true;
   
    var token = Cookies.get("jwt");
    if(!token) {
      setUserData(null);
      return;
    };
    //have token
    handleVerifyJwt(token);

    return () => {
      isMounted = false;
    }
  }, []);

  const handleRegister = () => {
    axios.post("https://localhost:7210/register", {
      email: "user002@gmail.com",
      password: "147896aA@",
      confirmedpassword: "147896aA@",
      role: "User",
    })
    .then(res => console.log(res))
  }

  // 1. reload... userData empty... render private route... 


  return (
    <>
    <BackdropCustom isLoading={isLoading}/>
    <Routes>
      <Route path='/register' element={
        <PublicRoute userData={userData}>
          <RegisterPage />
        </PublicRoute>  
      }>
      </Route>

      <Route path='/login' element={
        <PublicRoute userData={userData}>
          <LoginPage setUserData={setUserData} userData={userData} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </PublicRoute>
      }>

      </Route>
      <Route path='/' element= {
        <PrivateRoute isAllowed={!!userData && (userData.roles.includes("User") || userData.roles.includes("Admin"))} userData={userData}>
          <Home userId={userData?.id}/>
        </PrivateRoute>
      }></Route>
      
      <Route  path='/account' element={<AccountPage userId={userData?.id}/>}></Route>
      <Route path="/account/create" element={<AccountCreatePage userId={userData?.id}/>}></Route>

      <Route path="/dashboard" element={
        <PrivateRoute isAllowed={!!userData && userData.roles.includes("Admin")} userData={userData}>
          <Dashboard userId={userData?.id}/> 
        </PrivateRoute>
      }></Route>
    
    <Route  path='/hoso' element={<HosoPage userId={userData?.id}/>}></Route>
    <Route path='/hoso/:id' element={<HosoDetailPage userId={userData?.id}/>} />

      <Route path='/truong' element={<TruongPage userId={userData?.id}/>} />

      <Route  path='/accessdenied' element={<AccessDenied />}></Route>
      <Route  path='*' element={<NotFound />}></Route>
    </Routes>
    </>
    

    
  )
}
  