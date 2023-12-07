import {combineReducers} from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice';
import teamSlice from '../slices/teamSlice';

const rootReducer = combineReducers({
    user: userSlice,
    team: teamSlice
})

export default rootReducer;