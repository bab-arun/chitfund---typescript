/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@mui/material/Button';

export const ButtonMui = ({label,variant,...other}) => {
  return (
    <Button
    variant={variant}
    {...other}
    >
    {label}
    </Button>
  )
}
