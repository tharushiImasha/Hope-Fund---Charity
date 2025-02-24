import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Causes} from "../models/dashboard/Causes.ts";

const initialState : Causes[] = [];

const causeSlice = createSlice({
    name: 'cause',
    initialState,
    reducers: {
        addCause(state, action) {
            state.push(action.payload);
        },
        updateCause: (state, action) => {
            const index = state.findIndex(cause => cause.causeId === action.payload.causeId);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCause: (state, action) => {
            const index = state.findIndex(cause => cause.causeId === action.payload.causeId);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addCause, updateCause, deleteCause } = causeSlice.actions;
export default causeSlice.reducer;
