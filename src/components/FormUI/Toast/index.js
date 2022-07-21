import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function Toast({open, handleClose, type, message}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
    <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
  )
}
