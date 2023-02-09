/* eslint-disable react/prop-types */
import React from 'react'
import { PatternFormat } from "react-number-format";
import TextField from "@mui/material/TextField";



export const NumberFormat = ({ format, onChange,name,label,value,size,errorMessage,margin,inputProps,...other }) => {
  return (
      <PatternFormat
        customInput={TextField}
      format={format}
      name={name}
      margin={margin}
      label={label}
      value={value}
      size={size}
       fullWidth
      onChange={onChange}
       inputProps={inputProps}
       {...other}
      {...(errorMessage !== '' && { error: true, helperText: errorMessage })}         
      />
  )
}