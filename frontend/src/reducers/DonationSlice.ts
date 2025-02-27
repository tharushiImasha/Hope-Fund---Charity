import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {Donation} from "../models/dashboard/Donation.ts";

const initialState : Donation[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/donation'
})

export const addDonation = createAsyncThunk(
    'donation/addDonation',
    async(donation:Donation) => {
        try {
            const response = await api.post('/add', donation);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getDonation = createAsyncThunk(
    'donation/viewDonation',
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


const donationSlice = createSlice({
    name : 'donation',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(addDonation.pending, (state, action) => {
                console.log("Save donation pending")
            })
            .addCase(addDonation.fulfilled, (state, action) => {
                console.log("Save donation fulfilled")
                state.push(action.payload);
            })
            .addCase(addDonation.rejected, (state, action) => {
                console.error('Save donation rejected');
            });
        builder
            .addCase(getDonation.pending, (state, action) => {
                console.log("Get donation pending")
            })
            .addCase(getDonation.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getDonation.rejected, (state, action) => {
                console.error('Get donation rejected');
            });

    }
});

export default donationSlice.reducer;
