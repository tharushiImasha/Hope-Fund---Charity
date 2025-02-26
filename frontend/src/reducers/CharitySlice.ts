import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Charity} from "../models/dashboard/Charity.ts";
import axios from "axios";

const initialState : Charity[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/charityRepresentative'
})

export const addCharity = createAsyncThunk(
    'charity/addCharity',
    async(charities:Charity) => {
        try {
            const response = await api.post(`/add/${charities.email}`, charities);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getCharity = createAsyncThunk(
    'charity/viewCharity',
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

export const deleteCharity = createAsyncThunk(
    'charity/deleteCharity',
    async(email : string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const updateCharity = createAsyncThunk(
    'charity/updateCharity',
    async(charity: Charity) => {
        try {
            const response = await api.put(`/update/${charity.email}`, charity);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)


const charitySlice = createSlice({
    name : 'charity',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(addCharity.pending, (state, action) => {
                console.log("Save charity pending")
            })
            .addCase(addCharity.fulfilled, (state, action) => {
                console.log("Save charity fulfilled")
                state.push(action.payload);
            })
            .addCase(addCharity.rejected, (state, action) => {
                console.error('Save charity rejected');
            });
        builder
            .addCase(getCharity.pending, (state, action) => {
                console.log("Get charity pending")
            })
            .addCase(getCharity.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getCharity.rejected, (state, action) => {
                console.error('Get charity rejected');
            });
        builder
            .addCase(updateCharity.pending, (state, action) => {
                console.log("Update charity pending", action.payload)
            })
            .addCase(updateCharity.fulfilled, (state, action) => {
                const charities = state.find((charity: Charity) => charity.email === action.payload.email);
                if(charities){
                    charities.name = action.payload.name;
                    charities.address = action.payload.address;
                    charities.nic = action.payload.nic;
                }
                console.log("Update charity fulfilled", action.payload)
            })
            .addCase(updateCharity.rejected, (state, action) => {
                console.error('Update charity rejected');
            });
        builder
            .addCase(deleteCharity.pending, (state, action) => {
                console.log("Delete charity pending")
            })
            .addCase(deleteCharity.fulfilled, (state, action) => {
                return state = state.filter((charity: Charity) => charity.email !== action.payload.email);
            })
            .addCase(deleteCharity.rejected, (state, action) => {
                console.error('Delete charity rejected');
            });
    }
});

export default charitySlice.reducer;
