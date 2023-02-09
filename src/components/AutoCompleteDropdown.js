/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const AutoCompleteDropdown = ({ label, value, onChange, multiple,size, errorMessage,...other }) => {
  return (
    <Autocomplete
      size='small'
      disableClearable="true"
      multiple={multiple}
      id="autoComplete"
      value={value|| null}
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