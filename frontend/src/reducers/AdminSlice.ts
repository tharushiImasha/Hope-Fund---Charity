import { createSlice } from '@reduxjs/toolkit';
import {Admins} from "../models/dashboard/Admins.ts";

const initialState : Admins[] = [];

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin(state, action) {
            state.push(action.payload);
        },
        updateAdmin: (state, action) => {
            const index = state.findIndex(admin => admin.email === action.payload.email);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteAdmin: (state, action) => {
            const index = state.findIndex(admin => admin.email === action.payload.email);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addAdmin, updateAdmin, deleteAdmin } = adminSlice.actions;
export default adminSlice.reducer;
