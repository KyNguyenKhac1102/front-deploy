import { TextField } from '@mui/material';

export default function CustomField({
    field,
    form,
    shrink,
    ...otherProps
}) {
    
    const {name} = field;
    
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
    <TextField {...config} InputLabelProps={{shrink: shrink}} readOnly/>
  )
}
