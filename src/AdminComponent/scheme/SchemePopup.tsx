
import React, { useState } from 'react'
import { Divider, Grid, TextField } from '@mui/material';
import { ButtonMui } from '../../components/ButtonMui';
import FormProvider from '../../components/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextFieldMUi } from '../../components/TextFieldMui';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import useSnackbarHook from '../../components/useSnackbarHook';




const NewSchemeSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
});

type SchemeProps = {
  setOpenPopup: any;
  values: any;
  setValues: any;
  initialFieldValues: any;
  confirmDialog: any;
  setConfirmDialog: any;
  setTitle: any
};




export const SchemePopup: React.FunctionComponent<SchemeProps> = ({ setOpenPopup, values, setValues, initialFieldValues, confirmDialog, setConfirmDialog, setTitle }) => {
  
   // snackbar custom hook
   const{setMysnackbar}=useSnackbarHook();
   // --------------------------------------
  // close popup
  const closePopup = () => {
    setOpenPopup(false);
    setTitle('');
  }

  const methods = useForm({
    resolver: yupResolver(NewSchemeSchema),
    values,
  });

  const errorMsg = {
    schemeName: "",
    schemeAmount: "",
    numberOfUser: "",
    payAmount: "",
    schemeDuration: "",
    startDate: "",
    endDate: "",
  };
  const [errors, setErrors] = useState(errorMsg);

  // validate scheme
  const validateScheme = () => {
    const temp = errorMsg;
    temp.schemeName = values.schemeName ? '' : 'Scheme name is required';
    temp.schemeAmount = values.schemeAmount ? '' : 'Scheme amount is required';
    temp.numberOfUser = values.numberOfUser ? '' : 'Number of user is required';
    temp.payAmount = values.payAmount ? '' : 'Installment amount is required';
    temp.schemeDuration = values.schemeDuration ? '' : 'Scheme duration is required';
    temp.startDate = values.startDate ? '' : 'Start date is required';


    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  };


  // handle Input change
  const handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  }

  // create scheme api
  const saveScheme = (e: any) => {
    
    if (!validateScheme()) {
      return;
    }
   
    axios
      .post('http://localhost:8081/addSchemeDetails/save', values)
      .then((result) => {
        if ((result.data === "Scheme inserted successfully")) {
          setMysnackbar("scheme created successfully.","success");
          setOpenPopup(false);
          setTitle('');
          setTimeout(function () {
            window.location.href = "http://localhost:3000/adminhomepage";
          }, 1000);


        }
      })
      .catch((error) => {
        setMysnackbar("Oops Unable to add scheme","error");
      });
  };

  // handle scheme duration
  const handleSchemeDuration = (e: any) => {
    const value = e.target.value;
    setValues({ ...values, schemeDuration: value, startDate: null });

  }

  // start date handler
  const startDateHandler = (e: any) => {
    let date: any = new Date(e);
    console.log(date);


    let duration = values.schemeDuration;
    let monthValue = 12;

    let year = Math.floor(duration / monthValue);
    let month = duration % monthValue;

    if (year > 0) {
      let newYear = date.getFullYear() + year;
      date.setFullYear(newYear);
    }
    if (month > 0) {
      let newMonth = date.getMonth() + month;
      date.setMonth(newMonth);
    }
    date = new Date(date).toISOString().slice(0, 10);
    setValues({ ...values, startDate: e, endDate: date });

  }



  return (
    <>

      <FormProvider methods={methods} onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2} sx={{ mt: -1, mb: 1 }}>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Scheme name"
              name="schemeName"
              value={values.schemeName}
              onChange={handleInputChange}
              {...(errors.schemeName !== '' && { error: true, helperText: errors.schemeName })}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Scheme amount"
              name="schemeAmount"
              type="number"
              value={values.schemeAmount}
              onChange={handleInputChange}
              {...(errors.schemeAmount !== '' && { error: true, helperText: errors.schemeAmount })}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Number Of User"
              name="numberOfUser"
              type="number"
              value={values.numberOfUser}
              onChange={handleInputChange}
              {...(errors.numberOfUser !== '' && { error: true, helperText: errors.numberOfUser })}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Installment Amount"
              name="payAmount"
              type="number"
              value={values.payAmount}
              onChange={handleInputChange}
              {...(errors.payAmount !== '' && { error: true, helperText: errors.payAmount })}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label=" Scheme Duration (in months)"
              name="schemeDuration"
              type="number"
              value={values.schemeDuration}
              onChange={handleSchemeDuration}
              {...(errors.schemeDuration !== '' && { error: true, helperText: errors.schemeDuration })}
            />
          </Grid>

          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={values.startDate}
                onChange={startDateHandler}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "225px" }}
                    {...params}
                    {...(errors.startDate !== '' && { error: true, helperText: errors.startDate })}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={values.endDate}
                disabled={true}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "225px" }}
                    {...params} />
                )} onChange={function (value: any, keyboardInputValue?: string | undefined): void {
                  throw new Error('Function not implemented.');
                }} />
            </LocalizationProvider>
          </Grid>

        </Grid>


      </FormProvider>
      <Divider variant="fullWidth" sx={{ mt: 2, borderColor: '#D0D0D0' }} />
      <Grid container spacing={2} sx={{ mt: 2 }} >
        <Grid item xs={6}>

          <ButtonMui
            sx={{
              background: "black",
              color: "white",
              marginRight: "400px"
            }}
            variant="contained"
            label="Cancel"
            onClick={closePopup}
          />
        </Grid>
        <Grid container item xs={6} display="flex" justifyContent="flex-end" alignItems="flex-end">

          <ButtonMui
            sx={{
              background: "black",
              color: "white",
            }}
            variant="contained"
            label="Save"
            onClick={saveScheme}
          />


        </Grid>

      </Grid>
    </>
  )
}
