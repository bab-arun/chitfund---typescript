/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@mui/material/Button';

interface Props {
  label?: string,
  variant?:any,
 [x:string]:any
}

export const ButtonMui = ({label,variant,...other}:Props) => {
  return (
    <Button
    variant={variant}
    {...other}
    >
    {label}
    </Button>
  )
}
