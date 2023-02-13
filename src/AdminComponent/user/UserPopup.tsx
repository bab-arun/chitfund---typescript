/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { ButtonMui } from '../../components/ButtonMui'
import { Divider, Grid } from '@mui/material';
import axios from "axios";
import swal from "sweetalert";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/FormProvider';
import { TextFieldMUi } from '../../components/TextFieldMui';
import { AutoCompleteDropdown } from '../../components/AutoCompleteDropdown';

const NewUserSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
});

// role
const role = [
  {
    id: 0,
    name: "admin",
  },
  {
    id: 1,
    name: "user"
  },
]

type UserProps = {
  setOpenPopup: any;
  values: any;
  setValues: any;
  initialFieldValues:any;
  confirmDialog:any;
  setConfirmDialog:any;
  setTitle:any
};


export const UserPopup: React.FunctionComponent<UserProps>  = ({ setOpenPopup, values, setValues, initialFieldValues, confirmDialog, setConfirmDialog, setTitle }) => {


  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    values,
  });
  // close popup
  const closePopup = () => {
    setOpenPopup(false);
    setTitle('');
  }

  const errorMsg = {
    userCode: "",
    userName: "",
    password: "",
    mobile: "",
    email: "",
    address: "",
    role: "",
  };
  const [errors, setErrors] = useState(errorMsg);

  // validate user
  const validateUser = () => {
    const temp = errorMsg;
    temp.userCode = values.userCode ? '' : 'User Code is required';
    temp.userName = values.userName ? '' : 'User Name is required';
    temp.password = values.password ? '' : 'Password is required';
    temp.email = values.email ? '' : 'Email is required';
    temp.mobile = values.mobile ? '' : 'Mobile is required';
    temp.address = values.address ? '' : 'Address is required';
    temp.role = values.role ? '' : 'Role is required';


    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  };

  /////////////////create user api call
  const saveUser = () => {
  if(!validateUser()){
    return
  }
  console.log(values,"user save method")
    axios
      .post("http://localhost:8081/user-details/save", values)
      .then((result) => {
        console.log(result);
        if (result.data === "User Record Saved Successfully") {
          swal({
            text: values.userCode,
            title: " Saved Successfully!!!",
          }).then(function () {
            window.location.href = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle Input change
  const handleInputChange = (e:any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "mobile") {
      const fixedMobile = value.slice(0, 10);
      setValues({ ...values, mobile: fixedMobile });
    }
    else {
      setValues({ ...values, [name]: value });
    }

  }


  // for username validation
  const userNameHandler = () => {

    const validUserName = /^[A-Za-z ]+$/;

    if (validUserName.test(values.userName)) {
      setErrors({ ...errors, userName: "" })
    } else if(values.userName !== '' && values.userName !== null) {
      setErrors({ ...errors, userName: "Only aphabets" })
    }
  };

  const userNameHider = () => {
    setErrors({ ...errors, userName: "" })
  }

  // usercode validation
  const userCodeHandler = () => {

    if (values.userCode !== '' && values.userCode !== null) {

      axios
        .get("http://localhost:8081/checkDupilcateUserCode", {
          params: {
            userCode: values.userCode,
          },
        })
        .then((response) => {
          if (response.data === "userCode exist") {
            swal({
              title: "Exist UserCode",
              icon: "warning",
              dangerMode: true,
            });
            setValues({ ...values, userCode: "" });
          }
        });
    }

    const validUserCode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (validUserCode.test(values.userCode)) {
      setErrors({ ...errors, userCode: "" })
    } else if(values.userCode !== '' && values.userCode !== null){
      setErrors({ ...errors, userCode: "Only Email format" })
    }
  };

  const userCodeHider = () => {
    setErrors({ ...errors, userCode: "" })
  }

  // password validation
  const passwordHandler = (e:any) => {

    const validPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

   if (validPassword.test(values.password)) {
      setErrors({ ...errors, password: "" })
    } else if(values.password !== '' && values.password !== null) {
      setErrors({ ...errors, password: "Use upper,lower,special and numeric characters" })
    }
  };

  const passwordHider = () => {
    setErrors({ ...errors, password: "" })
  }

  // Email validation
  const emailHandler = (e:any) => {

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (validEmail.test(values.email)) {
      setErrors({ ...errors, email: "" })
    } else if(values.email !== '' && values.email !== null) {
      setErrors({ ...errors, email: "Only Email format" })
    }
  };

  const emailHider = () => {
    setErrors({ ...errors, email: "" })
  }

  const mobileHandler = () => {
    if (values.mobile !== '' && values.mobile.length === 10) {
      const firstDigit = values.mobile.charAt(0);
      const digits = ["6", "7", "8", "9"];
      const result = digits.includes(firstDigit);
      if (result) {
        setErrors({ ...errors, mobile: "" })
      }
      else {
        setErrors({ ...errors, mobile: "Telephone is start with 6,7,8,9" })

      }
    }
    else if (values.mobile !== '') {
      setErrors({ ...errors, mobile: "Telephone no should be 10 numbers" })
    }
  
  }

  const mobileHider = () => {
    setErrors({ ...errors, mobile: "" })
  }

  // Role validation
  const handleRole = (event:any, value:any) => {
    setValues({ ...values, role: value.name });
  }


  //   ----------------------------------------------------------
  return (
    <>
      <FormProvider methods={methods} onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2} sx={{ mt: -1, mb: 1 }}>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="User Name"
              name="userName"
              value={values.userName}
              onBlur={userNameHandler}
              onFocus={userNameHider}
              onChange={handleInputChange}
              {...(errors.userName !== '' && { error: true, helperText: errors.userName })}
              
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="User Code"
              name="userCode"
              value={values.userCode}
              onBlur={userCodeHandler}
              onFocus={userCodeHider}
              onChange={handleInputChange}
              {...(errors.userCode !== '' && { error: true, helperText: errors.userCode })}
              
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onBlur={passwordHandler}
              onFocus={passwordHider}
              onChange={handleInputChange}
              {...(errors.password !== '' && { error: true, helperText: errors.password })}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Email"
              name="email"
              value={values.email}
              onBlur={emailHandler}
              onFocus={emailHider}
              onChange={handleInputChange}
              {...(errors.email !== '' && { error: true, helperText: errors.email })}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Mobile"
              name="mobile"
              type="number"
              value={values.mobile}
              onBlur={mobileHandler}
              onFocus={mobileHider}
              onChange={handleInputChange}
              {...(errors.mobile !== '' && { error: true, helperText: errors.mobile })}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldMUi
              variant="outlined"
              label="Address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              {...(errors.address !== '' && { error: true, helperText: errors.address })}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <AutoCompleteDropdown
              label="Role"
              sx={{ width: "220px", height: '50px' }}
              onChange={handleRole}
              size={''}
              multiple={''}
              value={role.find((option) => option.name === values.role)}
              options={role}
              getOptionLabel={(role: { name: any; }) => `${role.name}`}
              errorMessage={errors.role}
            />
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
            onClick={saveUser}
          />


        </Grid>

      </Grid>

    </>
  )
}
