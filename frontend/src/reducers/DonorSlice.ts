import { createSlice } from '@reduxjs/toolkit';
import {Donor} from "../models/dashboard/Donor.ts";

const initialState : Donor[] = [];

const donorSlice = createSlice({
    name: 'donor',
    initialState,
    reducers: {
        addDonor(state, action) {
            state.push(action.payload);
        },
        updateDonor: (state, action) => {
            const index = state.findIndex(donor => donor.email === action.payload.email);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteDonor: (state, action) => {
            const index = state.findIndex(donor => donor.email === action.payload.email);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addDonor, updateDonor, deleteDonor } = donorSlice.actions;
export default donorSlice.reducer;
