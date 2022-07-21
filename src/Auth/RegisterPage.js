import { Button } from "@mui/material";
import axios from "axios";
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import Textfield from '../components/FormUI/Textfield';

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

const handleRegister = (values) => {
  axios.post("https://localhost:7210/register", values)
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

export default function RegisterPage() {
  return (
      <>
        <div>RegisterPage</div>
        
        <Formik
          initialValues={INIT_VALUE}
          validationSchema={INIT_VALIDATE}
          onSubmit={(values) => {
            console.log(values)
            handleRegister(values);
          }}
        >
          <Form>
            <Textfield name="email" label="Email"/>
            <Textfield name="password" label="Password" type="password"/>
            <Textfield name="confirmedPassword" label="Confirmed Password" type="password"/>
            <Button type="submit" variant='contained' >Register</Button>
          </Form>
        </Formik>
      </>
  )
}
