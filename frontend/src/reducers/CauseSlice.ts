import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {Causes} from "../models/dashboard/Causes.ts";

const initialState : Causes[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/charityProgramme'
})

export const addCause = createAsyncThunk(
    'cause/addCause',
    async(cause:Causes) => {
        try {
            const response = await api.post('/add', cause);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getCause = createAsyncThunk(
    'cause/viewCause',
    async () => {
        try {
            const response = await api.get('/view');
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
);

export const deleteCause = createAsyncThunk(
    'cause/deleteCause',
    async(id : string) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const updateCause = createAsyncThunk(
    'cause/updateCause',
    async(cause: Causes) => {
        try {
            const response = await api.put(`/update/${cause.causeId}`, cause);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)


const causeSlice = createSlice({
    name : 'cause',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(addCause.pending, (state, action) => {
                console.log("Save cause pending")
            })
            .addCase(addCause.fulfilled, (state, action) => {
                console.log("Save cause fulfilled")
                state.push(action.payload);
            })
            .addCase(addCause.rejected, (state, action) => {
                console.error('Save cause rejected');
            });
        builder
            .addCase(getCause.pending, (state, action) => {
                console.log("Get cause pending")
            })
            .addCase(getCause.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getCause.rejected, (state, action) => {
                console.error('Get cause rejected');
            });
        builder
            .addCase(updateCause.pending, (state, action) => {
                console.log("Update cause pending", action.payload)
            })
            .addCase(updateCause.fulfilled, (state, action) => {
                const causes = state.find((cause: Causes) => cause.causeId === action.payload.causeId);
                if(causes){
                    causes.title = action.payload.title;
                    causes.description = action.payload.description;
                    causes.documentation = action.payload.documentation;
                    causes.date = action.payload.date;
                    causes.category = action.payload.category;
                    causes.location = action.payload.location;
                    causes.image = action.payload.image;
                    causes.goalAmount = action.payload.goalAmount;
                    causes.raisedAmount = action.payload.raisedAmount;
                    causes.verifiedStatus = action.payload.verifiedStatus;
                    causes.crId = action.payload.crId;
                    causes.adminId = action.payload.adminId;
                }
                console.log("Update cause fulfilled", action.payload)
            })
            .addCase(updateCause.rejected, (state, action) => {
                console.error('Update cause rejected');
            });
        builder
            .addCase(deleteCause.pending, (state, action) => {
                console.log("Delete cause pending")
            })
            .addCase(deleteCause.fulfilled, (state, action) => {
                return state = state.filter((cause: Causes) => cause.causeId !== action.payload.causeId);
            })
            .addCase(deleteCause.rejected, (state, action) => {
                console.error('Delete cause rejected');
            });
    }
});

export default causeSlice.reducer;
