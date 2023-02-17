import {configureStore} from '@reduxjs/toolkit'
import {useSelector,useDispatch,TypedUseSelectorHook} from 'react-redux'
import schemeSlice from '../slices/schemeSlice';

export const store=configureStore({
    reducer:{
    scheme:schemeSlice
    }
})

export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;