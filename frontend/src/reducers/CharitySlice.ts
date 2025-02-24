import { createSlice } from '@reduxjs/toolkit';
import {Charity} from "../models/dashboard/Charity.ts";

const initialState : Charity[] = [];

const charitySlice = createSlice({
    name: 'charity',
    initialState,
    reducers: {
        addCrop(state, action) {
            state.push(action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(charity => charity.email === action.payload.email);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCrop: (state, action) => {
            const index = state.findIndex(charity => charity.email === action.payload.email);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addCrop, updateCrop, deleteCrop } = charitySlice.actions;
export default charitySlice.reducer;
