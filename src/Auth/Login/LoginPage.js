import React from 'react'
import LoginForm from './components/LoginForm';
import useLoginState from '../../CustomHooks/useLoginState';
import { Navigate } from 'react-router';

export default function LoginPage({setUserData, userData, setIsAuthenticated, isLoading, setIsLoading}) {

  // const loginState = useLoginState();
  // if (loginState === undefined) {
  //   return <>Loading...</>;
  // }
  // const [logged, user] = loginState;
 
  // if (logged) {
  //   return <p>Hi, {JSON.stringify(user)}</p>;
  // } else {
  //   return <LoginForm setUserData={setUserData} setIsLoading={setIsLoading} isLoading={isLoading}/>;
  // }
  return <LoginForm setUserData={setUserData} setIsLoading={setIsLoading} isLoading={isLoading}/>
}
