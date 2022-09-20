import axios from "axios";
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './RegisterAdmision/Home';

import Cookies from 'js-cookie';
import AccessDenied from './pages/Unauthorized/AccessDeniedPage';

import AccountPage from "./Auth/Admin/Account/AccountPage";
import AccountCreatePage from "./Auth/Admin/Account/Create/AccountCreatePage";
import Dashboard from "./Auth/Admin/Dashboard/Dashboard";
import HosoDetailPage from "./Auth/Admin/Hoso/HosoDetailPage";
import HosoPage from "./Auth/Admin/Hoso/HosoPage";
import TruongPage from "./Auth/Admin/Truong/TruongPage";
import LoginPage from './Auth/Login/LoginPage';
import PrivateRoute from './Auth/Routes/PrivateRoute';
import PublicRoute from './Auth/Routes/PublicRoute';
import BackdropCustom from './components/FormUI/Loading/BackdropCustom';
import NotFound from './pages/NotFound/NotFoundPage';
import RegisterPage from "./pages/Register/RegisterPage";
import "./App.css"

export default function App() {


  const [isLoading, setIsLoading] = useState(false);

  
  const [userData, setUserData] = useState(undefined)


  const handleVerifyJwt = (token) => {
    setIsLoading(true);
    axios.get(`https://admission1-api.azurewebsites.net/api/Auth/login/cookie?jwtString=${token}`, {
      headers: {
        'Authorization': "Bearer" + token
      }
    }).then(res => {
      let user = res.data.user;
      setUserData(user);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
    });
  }

  useEffect(() => {  
    var token = Cookies.get("jwt");
    if(!token) {
      setUserData(null);
      return;
    };
    //have token
    handleVerifyJwt(token);
  }, []);

  // 1. reload... userData empty... render private route... 
  return (
    <>
    {/* <BackdropCustom isLoading={isLoading}/> */}
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
        <PrivateRoute isAllowed={!!userData && (userData.roles.includes("User"))} userData={userData}>
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
  