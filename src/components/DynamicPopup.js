/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, Divider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';

const DynamicPopup = (props) => {
  const { title, children, openPopup, onClose,maxWidth} = props;
  return (
    <Dialog open={openPopup} fullWidth maxWidth={maxWidth} >
      <DialogTitle>
        <Typography variant="h6s" sx={{ mb: 15, color: '#000' }} divider>
          {title}
        </Typography>
        <IconButton sx={{ float: 'right' }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Divider variant="fullWidth" sx={{ mt: 2, borderColor: '#D0D0D0' }} />
      </DialogTitle>
      <DialogContent
      // style={{ overflow: 'hidden' }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DynamicPopup;