import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Donor} from "../models/dashboard/Donor.ts";
import axios from "axios";

const initialState : Donor[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/donor'
})

export const addDonor = createAsyncThunk(
    'donor/addDonor',
    async(donor:Donor) => {
        try {
            const response = await api.post(`/add/${donor.email}`, donor);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getDonor = createAsyncThunk(
    'donor/viewDonor',
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

export const deleteDonor = createAsyncThunk(
    'donor/deleteDonor',
    async(email : string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const updateDonor = createAsyncThunk(
    'donor/updateDonor',
    async(donor: Donor) => {
        try {
            const response = await api.put(`/update/${donor.email}`, donor);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)


const donorSlice = createSlice({
    name : 'donor',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(addDonor.pending, (state, action) => {
                console.log("Save donor pending")
            })
            .addCase(addDonor.fulfilled, (state, action) => {
                console.log("Save donor fulfilled")
                state.push(action.payload);
            })
            .addCase(addDonor.rejected, (state, action) => {
                console.error('Save donor rejected');
            });
        builder
            .addCase(getDonor.pending, (state, action) => {
                console.log("Get donor pending")
            })
            .addCase(getDonor.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getDonor.rejected, (state, action) => {
                console.error('Get donor rejected');
            });
        builder
            .addCase(updateDonor.pending, (state, action) => {
                console.log("Update donor pending", action.payload)
            })
            .addCase(updateDonor.fulfilled, (state, action) => {
                const donors = state.find((donor: Donor) => donor.email === action.payload.email);
                if(donors){
                    donors.name = action.payload.name;
                    donors.phone = action.payload.phone;
                }
                console.log("Update donor fulfilled", action.payload)
            })
            .addCase(updateDonor.rejected, (state, action) => {
                console.error('Update donor rejected');
            });
        builder
            .addCase(deleteDonor.pending, (state, action) => {
                console.log("Delete doonor pending")
            })
            .addCase(deleteDonor.fulfilled, (state, action) => {
                return state = state.filter((donor: Donor) => donor.email !== action.payload.email);
            })
            .addCase(deleteDonor.rejected, (state, action) => {
                console.error('Delete donor rejected');
            });
    }
});

export default donorSlice.reducer;
