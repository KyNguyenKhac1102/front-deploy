import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import * as yup from "yup";
import SelectWrapper from '../../../../../components/FormUI/Select';
import Textfield from '../../../../../components/FormUI/Textfield';
import Toast from '../../../../../components/FormUI/Toast';
import { useHttpClient } from '../../../../../CustomHooks/httpClient';
import "./AccountCreate.css";

const token = Cookies.get('jwt');

const config = {
    headers: {
        "Authorization" : `Bearer ${token}`
    }
}


const INIT_VALUE = {
    email: "",
    password: "",
    role: ""
}

const INIT_VALIDATE = yup.object().shape({
    email: yup.string().email("Email format").required("Required"),
    password: yup.string().required("Required"),
    role: yup.string().required("Required"),
})


export default function AccountCreate() {

    const [toastState, setToastState] = useState({
        open: false,
        message: "",
        type: "info"
    });

    const handleClose = () => {
        setToastState({...toastState ,open: false})
    }

    const {data: roles} = useHttpClient("https://admission-front.azurewebsites.net/roles");
    let options = {};

    roles.forEach(item => {
        options[item.name] = item.name
    })

    // roles.map((item) => (
    //     options[item.name] = item.name
    // ))

    const handleCreate = (values) => {
        axios.post("https://admission-front.azurewebsites.net/account/create", values, {
            ...config
        })
        .then(res => {
            setToastState({
                open: true,
                message: res.data.message,
                type: "success"
            })
        })
        .catch(err => {
            if(err.response)
            {
                setToastState({
                    open: true,
                    message: "Error message from backend!! " + err.response.status + "ERROR",
                    type: "error"
                })
            }
        })

    }

  return (
    <div className='AccountCreateMain'>
        <Toast {...toastState} handleClose={handleClose}/>
        <Formik initialValues={{...INIT_VALUE}} validationSchema={INIT_VALIDATE} onSubmit={(values) => {
            console.log(values)
            handleCreate(values);
        }}>
            {({values, errors}) => (
                <Form className='form-container'>
                    <h1>Account Create</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Textfield name="email" label="Email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Textfield name="password" label="Password" type="password"/>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectWrapper name="role" label="Role" options={options}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained">Create</Button>
                        </Grid>
                    </Grid>
                    <pre>{JSON.stringify({values, errors}, null, 2)}</pre>
                </Form>
            )}
        </Formik>

    </div>
  )
}
