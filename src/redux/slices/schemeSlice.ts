import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    schemeName:''
  };

export const schemeSlice = createSlice({
    name:"scheme",
    initialState,
    reducers:{
        schemeNameChange: (state,action)=>{
            state.schemeName=action.payload.schemeName;
        }
    },

});

export default schemeSlice.reducer;
export const {schemeNameChange}=schemeSlice.actions;