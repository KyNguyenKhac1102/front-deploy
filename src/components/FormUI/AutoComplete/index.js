import { Autocomplete, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import React from 'react'

const handleTruongData = (item) => {
    if(item.diaChi === null)
    {
      item.diaChi = "";
    }

    if(parseInt(item.maTinh) < 10)
    {
      item.maTinh = parseInt(item.maTinh).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    }

    var displayString = item.maTinh.concat(" " ,item.maTruong," ",item.tenTruong, " ", item.diaChi);
    if(displayString.length > 100)
    {
      displayString = displayString.slice(0, 100) + "...";
    }
    return displayString;
  }

export default function AutoCompleteWrapper({
    name,
    options,
    page,
    setPage,
    setSearchKey,
    form,
    ...otherProps
}) {
    const {setFieldValue, touched ,setTouched} = useFormikContext();
    const [field, meta] = useField(name);

    const config = {
        ...otherProps,
        ...field,
        required: true,
        fullWidth: true,
    }

    if(meta && meta.touched && meta.error)
    {
        config.error = true;
        config.helperText = meta.error;
    }
    
  return (
    <Autocomplete
        id="auto-complete-demo"
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => {
            return handleTruongData(option);
        }}
        ListboxProps={{
            onScroll: (event) => {
                const listboxNode = event.currentTarget;
                if(listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight)
                {
                    setPage((page) => page + 1)
                }
            }
        }}
        onInputChange={(e, value) => {
          setSearchKey(value);
        }}
        onChange={(_, newValue) => {          
          console.log(newValue);
          setSearchKey("");
            if(newValue === null)
            {
                setFieldValue(name, "");
            }else{
                setFieldValue(name, newValue.id);
            }
            
        }}
        renderInput={(params) => <TextField {...params} {...config}/>}
    />
  )
}
