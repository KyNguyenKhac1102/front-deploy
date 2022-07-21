import { useFormikContext } from 'formik';
import React from 'react';

export default function UploadFiles({name}) {
    const {setFieldValue} = useFormikContext();

  return (
    <div className="form-group">
    {/* <label >File upload</label> */}
    <input id="file" name="file" type="file" onChange={(event) => {
      setFieldValue(name , event.currentTarget.files[0]);
    }} className="form-control" />
    {/* <Thumb file={values.file} /> */}
  </div>
  )
}
