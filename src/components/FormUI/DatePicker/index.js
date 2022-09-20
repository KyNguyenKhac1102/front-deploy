import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { useFormikContext, useField } from 'formik'
import React from 'react'

const CustomDatePicker = ({
    name,
    ...otherProps
}) => {
    const [meta] = useField(name);
    const formik = useFormikContext();

    const config = {
        ...otherProps,
        fullWidth: true,
        required: true,
    }

    if(meta && meta.error)
    {
        config.error = true;
        config.helperText = meta.error
    };

  return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* <Textfield name='ngaySinh' label="Ngày sinh" type='date' InputLabelProps={{shrink: true}}/> */}
              <DesktopDatePicker
            // label={label}
            inputFormat="dd/MM/yyyy"
            value={formik.values?.ngaySinh}
            // error={meta.touched && Boolean(meta.error)}
            // helperText={meta.error}
            onChange={(newValue) => {
              formik.setFieldValue(name , newValue.toLocaleDateString());
            }}
                      renderInput={(params) => (
              <TextField
                {...params}
                {...config}
                inputProps={{ ...params.inputProps, placeholder: "Chon Ngay" }}
              />
            )}
        />
        </LocalizationProvider>
  )
}

export default CustomDatePicker;