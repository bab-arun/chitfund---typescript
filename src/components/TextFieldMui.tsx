/* eslint-disable react/prop-types */
import React from 'react'
import TextField from '@mui/material/TextField';

interface TextFieldProps{
  label:string,
  variant:any,
  [x:string]: any;
}


export const TextFieldMUi: React.FunctionComponent<TextFieldProps> = ({label,variant,...other}) => {
  return (
    <TextField 
     id="textfield"
     label={label}
     variant={variant}
     {...other}
     />
  )
}
