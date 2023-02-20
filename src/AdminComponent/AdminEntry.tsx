
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import FormProvider from "../components/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { AutoCompleteDropdown } from "../components/AutoCompleteDropdown";
import { TextFieldMUi } from "../components/TextFieldMui";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from 'notistack';

const AdminEntrySchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
});

interface InitialFieldValues {
  schemeId: string | undefined,
  userId: string,
  installmentAmount: string | undefined,
  nextInstallmentDate: any
}
const initialFieldValues: InitialFieldValues = {
  schemeId: '',
  userId: '',
  installmentAmount: '',
  nextInstallmentDate: null,
}

export const AdminEntry = () => {
  const { scheme, amount } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState(initialFieldValues);
  const methods = useForm({
    resolver: yupResolver(AdminEntrySchema),
    values,
  });


  const errorMsg = {
    userId: '',
    schemeId: '',
    nextInstallmentDate: '',
    installmentAmount: '',
  };
  const [errors, setErrors] = useState(errorMsg);

  const validateAdminEntry = () => {
    const temp = errorMsg;
    temp.userId = values.userId ? '' : 'UserCode is required';
    temp.schemeId = values.schemeId ? '' : 'Scheme Name is required';
    temp.installmentAmount = values.installmentAmount ? '' : 'Installment Amount is required';
    temp.nextInstallmentDate = values.nextInstallmentDate ? '' : 'Installment Date is required';

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  }

  const adminentry = (event: any) => {
    event.preventDefault();

    if (!validateAdminEntry()) {
      return
    }

    axios
      .post("http://localhost:8081/adminPayment/payment", values)
      .then((result) => {
        console.log(result);
        if (result.data === "Admin Payment Done") {
          enqueueSnackbar(`${ values.userId} Payment Successfully by Admin`, { variant: "success", autoHideDuration: 4000 });
          setTimeout(function () {
            window.location.href = "http://localhost:3000/adminentry";
          }, 1000);

        } else {
         
          enqueueSnackbar(`${ values.userId} Payment for this Date is already Done`, { variant: "error", autoHideDuration: 4000 });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const [schemeNameList, setSchemeNameList] = useState([]);
  const [userCodeList, setUserCodeList] = useState([]);


  useEffect(() => {
    setValues({ ...values, schemeId: scheme, installmentAmount: amount });
    ////////////////////////////////////////get user code list by scheme name

    if(scheme !== '' && scheme !== null && scheme !== undefined){
      axios
      .get("http://localhost:8081/getAssignedSchemeUser/userCodeList", {
        params: {
          schemeName: scheme,
        },
      })

      .then((res) => {
        console.log(res.data);
        setUserCodeList(res.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Oops Unable to get usercode list`, { variant: "error", autoHideDuration: 4000 });
      });
    }
   
    axios
      .get("http://localhost:8081/getSchemeName/schemeNameList")
      .then((res) => {
        setSchemeNameList(res.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Oops Unable to get scheme list`, { variant: "error", autoHideDuration: 4000 });
      });
  }, [amount, scheme]);

  //////////////////////////////////////////////////////////

  // const getSchemeNameList = (e) => {
  //   let schemeName = e.target.value;
  //   console.log(schemeName);
  //   axios
  //     .get("http://localhost:8081/getAssignedSchemeUser/userCodeList", {
  //       params: {
  //         schemeName: schemeName,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setUserCodeList(res.data);
  //     })
  //     .catch((err) => console.log(err));

  //   axios
  //     .get("http://localhost:8081/getInstallmentAmount/bySchemeName", {
  //       params: {
  //         schemeName: schemeName,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setSchemeAmount(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // handle scheme name
  const handleSchemeName = (event: any, value: any) => {

    axios
      .get("http://localhost:8081/getAssignedSchemeUser/userCodeList", {
        params: {
          schemeName: value,
        },
      })
      .then((res) => {
        console.log(res.data, "userCodeList");
        setUserCodeList(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get usercode list`, { variant: "error", autoHideDuration: 4000 });
      });
    axios
      .get("http://localhost:8081/getInstallmentAmount/bySchemeName", {
        params: {
          schemeName: value,
        },
      })
      .then((res) => {
        setValues({ ...values, installmentAmount: res.data, schemeId: value })
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get installment amount`, { variant: "error", autoHideDuration: 4000 });
      });


  }

  // handle user Code
  const handleUserCode = (event: any, value: string) => {
    setValues({ ...values, userId: value });
  }



  //////////////////////////////////////////
  return (
    <>
      <AdminNavbar />
      <Box sx={{ textAlign: "center" }}>
        <FormProvider methods={methods} onSubmit={(e) => e.preventDefault()}>
          <Typography sx={{ marginTop: "30px", fontSize: "30px",marginBottom:"20px" }}><b>ADMIN ENTRY</b></Typography>

          <Stack direction="column" spacing={5} sx={{alignItems:"center"}}>
            <AutoCompleteDropdown
              label="Scheme Name"
              sx={{ width: "250px" }}
              onChange={handleSchemeName}
              size={''}
              multiple={''}
              value={schemeNameList.find((option) => option === values.schemeId)}
              options={schemeNameList}
              getOptionLabel={(schemeNameList: string) => `${schemeNameList}`}
              errorMessage={errors.schemeId}
            />

            <AutoCompleteDropdown
              label="User Code"
              sx={{ width: "250px" }}
              onChange={handleUserCode}
              size={''}
              multiple={''}
              value={userCodeList.find((option) => option === values.userId)}
              options={userCodeList}
              getOptionLabel={(userCodeList: string) => `${userCodeList}`}
              errorMessage={errors.userId}
            />


            <TextFieldMUi
              sx={{ width: "250px" }}
              variant="outlined"
              label="Installment Amount"
              name="installemntAmount"
              type="number"
              value={values.installmentAmount}
              disabled

            />


            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Installment Date"
                value={values.nextInstallmentDate}
                onChange={(newValue) => {
                  setValues({ ...values, nextInstallmentDate: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "250px" }}
                    {...params}
                    {...(errors.nextInstallmentDate !== '' && { error: true, helperText: errors.nextInstallmentDate })}
                  />
                )}
              />
            </LocalizationProvider>

            <Button variant="contained" sx={{ backgroundColor: "black", marginLeft: "625px", marginTop: "20px" }} onClick={adminentry}>
              Admin Payment
            </Button>
          </Stack>


        </FormProvider>
      </Box>
    </>
  );
};
