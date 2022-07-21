import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormikContext } from 'formik';

const inputLabelProps = {
  shrink: false
}

export default function DependenceField11({
    field,
    form,
    ...otherProps
}) {
    
    const {name} = field;
    const {values : {truong11, maTruong11}, touched, setFieldValue} = useFormikContext();

    useEffect(() => {

      if(touched.truong11 && name === "maTruong11")
      {
        setFieldValue(name, truong11.maTruong);
      }else if(touched.truong11 && name === "maTinh11")
      {
        setFieldValue(name, truong11.maTinh);
      }
    }, [truong11, touched.truong11, setFieldValue, name])

    if(!!maTruong11)
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
