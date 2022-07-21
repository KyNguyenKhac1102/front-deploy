import React from 'react'
import { InputLabel, TextField } from '@mui/material'
import {useField} from "formik";


export default function TextfieldServer({
    name,
    inputProps,
    shrink,
    serverError,
    ...otherProps
}) {
    const [field] = useField(name);
    
    const config = {
        ...field,
        ...otherProps,
        fullWidth: true,
        required: true,
    }


        if(serverError !== null)
        {
            config.error = true;
            if(name === "password")
            {
                config.helperText = serverError
            }

        }
    


  return (
      <TextField {...config} inputProps={inputProps} />
  )
}
