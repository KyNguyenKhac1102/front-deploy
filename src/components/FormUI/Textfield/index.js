import React from 'react'
import { InputLabel, TextField } from '@mui/material'
import {useField} from "formik";


export default function Textfield({
    name,
    inputProps,
    shrink,
    ...otherProps
}) {
    const [field, meta, helpers] = useField(name);
    
    const config = {
        ...field,
        ...otherProps,
        fullWidth: true,
        required: true,
    }

    //validation error
    if(meta && meta.touched && meta.error )
    {
        config.error = true;
        config.helperText = meta.error
    };
    

  return (
      <TextField {...config} inputProps={inputProps} />
  )
}
