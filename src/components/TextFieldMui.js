/* eslint-disable react/prop-types */
import React from 'react'
import TextField from '@mui/material/TextField';


export const TextFieldMUi = ({label,variant,...other}) => {
  return (
    <TextField 
     id="textfield"
     label={label}
     variant={variant}
     {...other}
     />
  )
}
