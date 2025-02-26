import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Admins} from "../models/dashboard/Admins.ts";
import axios from "axios";

const initialState : Admins[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/admin'
})

export const addAdmin = createAsyncThunk(
    'admin/addAdmin',
    async(admins:Admins) => {
        try {
            const response = await api.post(`/add/${admins.email}`, admins);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getAdmin = createAsyncThunk(
    'admin/viewAdmin',
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

export const deleteAdmin = createAsyncThunk(
    'admin/deleteAdmin',
    async(email : string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const updateAdmin = createAsyncThunk(
    'admin/updateAdmin',
    async(admin: Admins) => {
        try {
            const response = await api.put(`/update/${admin.email}`, admin);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)


const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(addAdmin.pending, (state, action) => {
                console.log("Save admin pending")
            })
            .addCase(addAdmin.fulfilled, (state, action) => {
                console.log("Save admin fulfilled")
                state.push(action.payload);
            })
            .addCase(addAdmin.rejected, (state, action) => {
                console.error('Save admin rejected');
            });
        builder
            .addCase(getAdmin.pending, (state, action) => {
                console.log("Get admin pending")
            })
            .addCase(getAdmin.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getAdmin.rejected, (state, action) => {
                console.error('Get admin rejected');
            });
        builder
            .addCase(updateAdmin.pending, (state, action) => {
                console.log("Update admin pending", action.payload)
            })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                const admins = state.find((admin: Admins) => admin.email === action.payload.email);
                if(admins){
                    admins.name = action.payload.name;
                    admins.address = action.payload.address;
                }
                console.log("Update admin fulfilled", action.payload)
            })
            .addCase(updateAdmin.rejected, (state, action) => {
                console.error('Update admin rejected');
            });
        builder
            .addCase(deleteAdmin.pending, (state, action) => {
                console.log("Delete admin pending")
            })
            .addCase(deleteAdmin.fulfilled, (state, action) => {
                return state = state.filter((admin: Admins) => admin.email !== action.payload.email);
            })
            .addCase(deleteAdmin.rejected, (state, action) => {
                console.error('Delete admin rejected');
            });
    }
});

export default adminSlice.reducer;
