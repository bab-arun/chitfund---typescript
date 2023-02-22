import React  from 'react';
import { useSnackbar } from 'notistack';

export default function useSnackbarHook() {
  const { enqueueSnackbar,closeSnackbar } = useSnackbar();
 
  
  return {

    
    setMysnackbar:(message,variant)=>{

      const action = snackbarId => (
       
        <button onClick={() => { closeSnackbar(snackbarId) }}>
          Dismiss
        </button>
        
    );
      console.log(message,variant,"test snack")
      if(variant === "success"){
        enqueueSnackbar(message, { variant: "success", autoHideDuration: 2000,action })
      }
      if(variant === "info"){
        enqueueSnackbar(message, { variant: "info", autoHideDuration: 2000,action })
      }
      if(variant === "error"){
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 10000,action })
      }
    }
 
}

 
}

