import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormikContext } from 'formik';

const inputLabelProps = {
  shrink: false
}

export default function DependenceField({
    field,
    form,
    ...otherProps
}) {
    
    const {name} = field;
    const {values : {truong10, maTruong10}, touched, setFieldValue} = useFormikContext();

    useEffect(() => {
      if(touched.truong10 && name === "maTruong10")
      {
        setFieldValue(name, truong10.maTruong);
      }else if(touched.truong10 && name === "maTinh10")
      {
        setFieldValue(name, truong10.maTinh);
      }

    }, [truong10, touched.truong10, setFieldValue, name])

    if(!!maTruong10)
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
