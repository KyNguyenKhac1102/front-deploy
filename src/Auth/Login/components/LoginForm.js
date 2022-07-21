import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import BackdropCustom from '../../../components/FormUI/Loading/BackdropCustom';
import Textfield from '../../../components/FormUI/Textfield';
import axios from "axios";
import * as yup from "yup";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import "./LoginForm.css"
import TextfieldServer from '../../../components/FormUI/TextFieldServer';

axios.defaults.withCredentials = true;

const INIT_LOGIN_VALIDATION = yup.object().shape({
  email: yup.string("Enter your email")
  .email("Enter valid email")
  .required("Required"),
  password: yup.string("Enter your password")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
  .required("Password required"),
}) 

const INIT_LOGIN_STATE = {
  email: "admin@gmail.com",
  password: "147896aA@"
}

export default function LoginForm({setUserData, setIsLoading, isLoading}) {
    const [errMessage, setErrMessage] = useState(null);
    let navigate = useNavigate()

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
          // navigate("/dashboard");
          window.location.href = "/dashboard";
        }else{
          window.location.href = "/login";
        }
      }
    
      const handleVerifyJwt = (token) => {
        axios.get(`https://localhost:7210/login/cookie?jwtString=${token}`, {
          headers: {
            'Authorization': "Bearer" + token
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
        axios.post("https://localhost:7210/login", values)
        .then(res => {
          console.log("login? ok" ,res); 
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
          }
    
        })  
        .catch(err => console.log("failed login" ,err));
      }

  return (
    <>
    <BackdropCustom isLoading={isLoading}/>
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
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">Login</Button>
                </Grid>
              </Grid>
            </Form>
   

          </Formik>
          </div>

        </>
  )
}
