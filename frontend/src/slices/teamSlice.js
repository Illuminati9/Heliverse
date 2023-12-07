import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teamData: null,
    loading: false,
}

const teamSlice = createSlice({
    name: 'team',
    initialState: initialState,
    reducers:{
        setTeamData(state,value){
            state.teamData = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }
})

export const { setLoading, setTeamData } = teamSlice.actions;

export default teamSlice.reducer;