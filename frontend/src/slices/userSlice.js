import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domains: null,
    genders: null,
    displayData: null,
    userData: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setGenders(state,value){
            state.genders = value.payload
        },
        setDomains(state,value){
            state.domains = value.payload;
        },
        setDisplayData(state,value){
            state.displayData = value.payload;
        },
        setUserData(state,value){
            state.userData = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }
})

export const { setUserData, setLoading,setDisplayData, setDomains,setGenders } = userSlice.actions;

export default userSlice.reducer;