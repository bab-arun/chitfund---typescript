
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import FormProvider from "../components/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Box, Button, Stack, Typography } from "@mui/material";
import { AutoCompleteDropdown } from "../components/AutoCompleteDropdown";
import { TextFieldMUi } from "../components/TextFieldMui";
// redux
import { useAppSelector } from "../redux/store/store";
import useSnackbarHook from "../components/useSnackbarHook";


const NewAssignSchemeSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
});

interface InitialFieldValues{
  schemeName:string,
  userCodeList:string[],
}

const initialFieldValues : InitialFieldValues={
  schemeName:'',
  userCodeList:[],
}

export const AssignScheme = () => {
   // snackbar custom hook
   const{setMysnackbar}=useSnackbarHook();
   // --------------------------------------
//  redux
const {schemeName:linkSchemeName}=useAppSelector((state)=> state.scheme)
// ----------------------------------------------------------------------
  const[values,setValues]= useState(initialFieldValues);


  const methods = useForm({
    resolver: yupResolver(NewAssignSchemeSchema),
    values,
  });


  const handleUsers=(event:any,value:any)=>{
  setValues({ ...values, userCodeList: value,schemeName:linkSchemeName});
  }

  const errorMsg = {
    userCodeList: "",
   
  };
  const [errors, setErrors] = useState(errorMsg);

  const validateAssignUser = () => {
    const temp = errorMsg;
    temp.userCodeList = values.userCodeList.length !== 0 ? '' : 'User Code is required';
   
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  };

  const assignScheme = (e:any) => {
    e.preventDefault();

    if(!validateAssignUser()){
      return
    }

    axios
      .post("http://localhost:8081/assignUserScheme/save",values)
      .then((response) => {
        console.log(response);
        if (response.data === "User is Assigned for scheme") {
          setMysnackbar(`New Users assigned to ${ values.schemeName} Successfully.`,"success");
          setTimeout(function () {
            window.location.href = "http://localhost:3000/adminhomepage";
          }, 1000);

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////////////////////

  const [userlist, setUserlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/userCode-List/show", {
        params: {
          schemeName: linkSchemeName,
        },
      })
      .then((res) => {
        console.log(res.data,"user list");
        setUserlist(res.data);
      })
      .catch((err) => console.log(err));
  }, [linkSchemeName]);
  //////////////////////////////////////////
  return (
    <>
      <AdminNavbar />

      <Box sx={{textAlign:"center"}}>
      <FormProvider methods={methods} onSubmit={(e) => e.preventDefault()}>
          <Typography sx={{ marginTop:"80px",fontSize:"30px"}}><b>ASSIGN CHIT SCHEME</b></Typography>

         
          <Stack direction="row" spacing={4} sx={{marginLeft:"400px",marginTop:"50px"}}>
             <AutoCompleteDropdown
              label="User Code"
              sx={{ width: "225px", height: '50px' }}
              onChange={handleUsers}
              size={''}
              multiple={'true'}
              value={values.userCodeList}
              options={userlist}
              required
              getOptionLabel={(userlist: any) => `${userlist}`}
              errorMessage={errors.userCodeList}
            />
            <br></br>
            <br></br>
            <TextFieldMUi
              variant="outlined"
              label="Scheme Name"
              name="schemeName"
              defaultValue={linkSchemeName}
              disabled
              />
               <br></br>
               <br></br>   

            <Button variant="contained" onClick={assignScheme} sx={{backgroundColor:"black"}}>
             Assign Scheme
              </Button>
              </Stack>
        
          </FormProvider>
      </Box>
    </>
  );
};
