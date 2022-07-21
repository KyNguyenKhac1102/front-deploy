import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormikContext } from 'formik';

const inputLabelProps = {
  shrink: false
}

export default function DependenceField12({
    field,
    form,
    ...otherProps
}) {

    const {name} = field;
    const {values : {truong12, maTruong12}, touched, setFieldValue} = useFormikContext();

    useEffect(() => {
       
      if(touched.truong12 && name === "maTruong12")
      {
        setFieldValue(name, truong12.maTruong);
      }else if(touched.truong12 && name === "maTinh12")
      {
        setFieldValue(name, truong12.maTinh);
      }
    }, [truong12, touched.truong12, setFieldValue, name])

    if(!!maTruong12)
    {
      inputLabelProps.shrink = true;
    }
    
    const config = {
        ...field,
        ...otherProps,
        fullWidth: true,
        required: true,
    }
    
    if(form.errors && form.touched[name] && form.errors[name])
    {
      config.error = true;
      config.helperText = form.errors[name]; 
    }

  return (
    <TextField {...config} InputLabelProps={inputLabelProps} inputProps={{readOnly: true}}/>
  )
}
