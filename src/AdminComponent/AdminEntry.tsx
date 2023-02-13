
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import FormProvider from "../components/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { AutoCompleteDropdown } from "../components/AutoCompleteDropdown";
import { TextFieldMUi } from "../components/TextFieldMui";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AdminEntrySchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
});

interface InitialFieldValues {
  schemeId:string|undefined,
  userId:string,
  installmentAmount:string|undefined,
  nextInstallmentDate:any
}
const initialFieldValues:InitialFieldValues = {
  schemeId: '',
  userId: '',
  installmentAmount: '',
  nextInstallmentDate: null,
}

export const AdminEntry = () => {
  const { scheme, amount } = useParams();
  const [values, setValues] = useState(initialFieldValues);
  const methods = useForm({
    resolver: yupResolver(AdminEntrySchema),
    values,
  });


  const errorMsg = {
   userId:'',
   schemeId:'',
   nextInstallmentDate:'',
   installmentAmount:'',
  };
  const [errors, setErrors] = useState(errorMsg);

const validateAdminEntry=()=>{
  const temp = errorMsg;
  temp.userId = values.userId ? '' : 'UserCode is required';
  temp.schemeId = values.schemeId ? '' : 'Scheme Name is required';
  temp.installmentAmount = values.installmentAmount ? '' : 'Installment Amount is required';
  temp.nextInstallmentDate = values.nextInstallmentDate ? '' : 'Installment Date is required';

  setErrors({ ...temp });
  return Object.values(temp).every((x) => x === '');
}

  const adminentry = (event:any) => {
    event.preventDefault();

    if(!validateAdminEntry()){
     return
    }

    axios
      .post("http://localhost:8081/adminPayment/payment", values)
      .then((result) => {
        console.log(result);
        if (result.data === "Admin Payment Done") {
          swal({
            text: values.userId,
            title: " Payment Successfully by Admin...!",
          }).then(function () {
            window.location.href = "http://localhost:3000/adminentry";
          });
        } else {
          swal({
            title:
              " user " + values.userId + " Payment for this Date is already Done...!",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const [schemeNameList, setSchemeNameList] = useState([]);
  const [userCodeList, setUserCodeList] = useState([]);


  useEffect(() => {
    setValues({...values,schemeId:scheme,installmentAmount:amount});
    ////////////////////////////////////////get user code list by scheme name
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
        console.log(error);
      });
    axios
      .get("http://localhost:8081/getSchemeName/schemeNameList")
      .then((res) => {
        setSchemeNameList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [amount,scheme]);

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
  const handleSchemeName = (event:any, value:any) => {
   
    axios
    .get("http://localhost:8081/getAssignedSchemeUser/userCodeList", {
      params: {
        schemeName: value,
      },
    })
    .then((res) => {
      console.log(res.data,"userCodeList");
      setUserCodeList(res.data);
    })
    .catch((err) => console.log(err));
    axios
    .get("http://localhost:8081/getInstallmentAmount/bySchemeName", {
      params: {
        schemeName:value,
      },
    })
    .then((res) => {
      setValues({...values,installmentAmount:res.data,schemeId:value})
    })
    .catch((err) => console.log(err));
    
    
  }

  // handle user Code
  const handleUserCode = (event:any, value:string) => {
    setValues({ ...values, userId: value });
  }

 

  //////////////////////////////////////////
  return (
    <>
      <AdminNavbar />
      <Box sx={{ textAlign: "center" }}>
        <FormProvider methods={methods} onSubmit={(e) => e.preventDefault()}>
          <Typography sx={{ marginTop: "50px", fontSize: "30px" }}><b>ADMIN ENTRY</b></Typography>

          <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
          <Grid item xs={12}>
          <AutoCompleteDropdown
            label="Scheme Name"
            sx={{ width: "222px", height: '50px',marginLeft:"570px" }}
            onChange={handleSchemeName}
            size={''}
            multiple={''}
            value={schemeNameList.find((option) => option === values.schemeId)}
            options={schemeNameList}
            getOptionLabel={(schemeNameList: string) => `${schemeNameList}`}
            errorMessage={errors.schemeId}
          />
          </Grid>
          <Grid item xs={12}>
          <AutoCompleteDropdown
            label="User Code"
            sx={{ width: "222px", height: '50px',marginLeft:"570px",marginTop:"10px" }}
            onChange={handleUserCode}
            size={''}
            multiple={''}
            value={userCodeList.find((option) => option === values.userId)}
            options={userCodeList}
            getOptionLabel={(userCodeList:string) => `${userCodeList}`}
            errorMessage={errors.userId}
          />

          </Grid>
          <Grid item xs={12}>
          <TextFieldMUi
          sx={{marginTop:"10px"}}
            variant="outlined"
            label="Installment Amount"
            name="installemntAmount"
            type="number"
            value={values.installmentAmount}
            disabled

          />

          </Grid>
          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Installment Date"
              value={values.nextInstallmentDate}
              onChange={(newValue) => {
                setValues({ ...values, nextInstallmentDate: newValue});
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ width: "225px",marginTop:"10px" }}
                  {...params}
                  {...(errors.nextInstallmentDate !== '' && { error: true, helperText: errors.nextInstallmentDate })}
                />
              )}
            />
          </LocalizationProvider>
          </Grid>
          <Button variant="contained" sx={{ backgroundColor: "black",marginLeft:"625px",marginTop:"20px" }} onClick={adminentry}>
            Admin Payment
          </Button>
          </Grid>

        </FormProvider>
      </Box>
    </>
  );
};
