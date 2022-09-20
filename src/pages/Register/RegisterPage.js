import { Button, Grid } from "@mui/material";
import axios from "../../api/Auth";
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import Textfield from '../../components/FormUI/Textfield';
import useAxiosFunction from "../../CustomHooks/useAxiosFunction";
import Toast from "../../components/FormUI/Toast";
import "./RegisterPage.css"
import { Link } from "react-router-dom";
import BackdropCustom from "../../components/FormUI/Loading/BackdropCustom";

const INIT_VALIDATE =  yup.object().shape({
  email: yup.string("Enter your email")
  .email("Enter valid email")
  .required("Required"),
  password: yup.string("Enter your password")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
  .required("Password required"),
  confirmedPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match")

})

const INIT_VALUE = {
  email: "",
  password: "",
  confirmedPassword: "",
  role: "User"
}


export default function RegisterPage() {

  const [response, loading, error, axiosFetch] = useAxiosFunction();

  const [toastState, setToastState] = useState({
    open: false,
    message: "",
    type: "info"
  });
  
  const handleClose = () => {
    setToastState({...toastState ,open: false})
  }
  
  const handleRegister =  (values) => {
  
     axiosFetch({
      axiosInstance: axios,
      url: "/register",
      method: "POST",
      requestConfig: {
        ...values
      },
      setToastState: setToastState
    })

  }
  

  return (
      <div>
        <BackdropCustom isLoading={loading}/>
        <Toast {...toastState} handleClose={handleClose}/>

        <div className="register-wrapper"> 
          <div className="register-label">Register</div>
          <Formik
            initialValues={INIT_VALUE}
            validationSchema={INIT_VALIDATE}
            onSubmit={(values) => {
              handleRegister(values);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Textfield name="email" label="Email"/>
                </Grid>
                <Grid item xs={12}>
                  <Textfield name="password" label="Password" type="password"/>
                </Grid>
                <Grid item xs={12}>
                  <Textfield name="confirmedPassword" label="Confirmed Password" type="password"/>
                </Grid>
                <Grid item xs={6} className="wrapper-loginLink">
                   <Button><Link to="/login"><div className="register-link-login">Login</div></Link></Button> 
                </Grid>
                <Grid item xs={6} sx={{textAlign: "right"}}>
                  <Button type="submit" variant='contained' ><div className="register-button">Register</div></Button>
                </Grid>
              </Grid>

            </Form>
          </Formik>
        </div>
      </div>
  )
}
