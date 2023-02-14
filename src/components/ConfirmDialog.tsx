import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props{
    confirmDialog:any,
    setConfirmDialog:any
}

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }:Props) => {
  const handleClose = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleKeypress = (e:any) => {
    if (e.key === 'Enter') {
      confirmDialog.onConfirm();
    }
  };

  return (
    <Dialog open={confirmDialog.isOpen} onKeyPress={handleKeypress} >
      <Typography
        variant="subtitle1"
        sx={{ alignItems: 'center', marginTop: '10px', marginLeft: '10px', fontSize: '18px' }}
      >
        {'Confirmation'}
        <IconButton sx={{ float: "right" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Typography>

      <DialogTitle sx={{ alignItems: 'left', pl: '10px', fontSize: '12px', minWidth: '400px' }}>{confirmDialog.title}</DialogTitle>
      <DialogContent sx={{ alignItems: 'left', textAlign: 'left', pl: '10px',  }}>
        <Typography variant="subtitle1" sx={{ pt: '20px', fontSize: '14px'  }}>
          {confirmDialog.subtitle}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" sx={{ alignItems: 'right' }} onClick={confirmDialog.onConfirm}>
          Yes
        </Button>
        <Button variant="contained" sx={{ alignItems: 'right' }} onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
