import { TextField } from '@mui/material';
import { useField } from "formik";
import React from 'react';


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
