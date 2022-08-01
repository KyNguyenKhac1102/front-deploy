import { Button, Grid } from '@mui/material';
import axios from "axios";
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackdropCustom from '../../../components/FormUI/Loading/BackdropCustom';
import TextfieldServer from '../../../components/FormUI/TextFieldServer';
import Toast from '../../../components/FormUI/Toast';
import "./LoginForm.css";

axios.defaults.withCredentials = true;

const INIT_LOGIN_STATE = {
  email: "admin@gmail.com",
  password: "147896aA@"
}

export default function LoginForm({setUserData, setIsLoading, isLoading}) {
    const [errMessage, setErrMessage] = useState(null);
    const [toastState, setToastState] = useState({
      open: false,
      message: "",
      type: "info"
    })
  
    const handleRedirectByRole = (roles) => {
        if(roles.includes("Admin") && roles.length === 1)
        {
          // navigate("/dashboard");
          window.location.href = "/dashboard";
        }else if(roles.includes("User") && roles.length === 1)
        {
          window.location.href = "/";
        }else if(roles.includes("Admin") && roles.includes("User"))
        {
          console.log("login re check")
          // navigate("/dashboard");
          window.location.href = "/dashboard";
        }else{
          window.location.href = "/login";
        }
      }
    
      const handleVerifyJwt = (token) => {
        axios.get(`https://admission1-api.azurewebsites.net/api/Auth/login/cookie?jwtString=${token}`, {
          headers: {
            'Authorization': "Bearer" + token,
          }
        }).then(res => {
          console.log("user", res);
          let user = res.data.user;
          console.log("user roles", res.data.user.roles);
          setUserData(user);
          handleRedirectByRole(user.roles);
        });
      }
    
      const handleLogin = (values) => {
        setIsLoading(true);
        axios.post("https://admission1-api.azurewebsites.net/api/Auth/login", values)
        .then(res => {
          console.log("login? ok" ,res); 
          Cookies.set("jwt", res.data.message)
          // failed with message? - email,password wrong..
          if(res.data.isSuccess === false)
          {
            setIsLoading(false);
            setErrMessage(res.data.message);
          }else{
            var token = Cookies.get("jwt");

            if(token !== undefined)
            {
              handleVerifyJwt(token);
              setIsLoading(false);
            }
            else{
              setToastState({
                open: true,
                message: "Token not found!",
                type: "error"
              })
              setIsLoading(false);
            }
          }
    
        })  
        .catch(err => console.log("failed login" ,err));
      }

      const handleClose = () => {
        setToastState({...toastState, open: false})
      }

  return (
    <>
    <BackdropCustom isLoading={isLoading}/>
    <Toast {...toastState} handleClose={handleClose} />
      <div className='login-wrapper'>

      <Formik
            initialValues={INIT_LOGIN_STATE}
            onSubmit={(values) => {
              console.log(values);
              handleLogin(values);
            }}
          >

        <Form >
          <div className='login-header'>
            Login
          </div>
              <Grid container rowSpacing={1} className="login-input">
                <Grid item xs={12}>
                  <TextfieldServer name="email" label="Email" serverError={errMessage}/>
                </Grid>
                <Grid item xs={12}>
                  <TextfieldServer name="password" label="Password" type="password" serverError={errMessage}/>
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" variant="contained">Login</Button>
                </Grid>
                <Grid item xs={6} className="login-registerLink">
                  <Button><Link to="/register"><div>Đăng Ký</div></Link></Button>
                </Grid>
              </Grid>
            </Form>
   

          </Formik>
          </div>

        </>
  )
}
