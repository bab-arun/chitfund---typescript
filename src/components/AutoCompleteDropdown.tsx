/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
  label?: string,
  value?:any,
  onChange?:any,
  multiple?:any,
  size?:any,
  errorMessage?:any,
  options?:any,
  [x:string]:any
 
}

export const AutoCompleteDropdown = ({ label, value, onChange, multiple,size, errorMessage,options,...other }:Props) => {
  return (
    <Autocomplete
      size='small'
      disableClearable={true}
      multiple={multiple}
      id="autoComplete"
      value={value|| null}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size={size}
          {...(errorMessage !== '' && { error: true, helperText: errorMessage })}         
        />
      )}
      onChange={onChange}
      {...other}
    />
  );
};