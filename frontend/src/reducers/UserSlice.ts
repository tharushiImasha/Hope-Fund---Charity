import {User} from "../models/dashboard/User.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState : User[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/user'
})

export const addUser = createAsyncThunk(
    'user/saveUser',
    async(user:User) => {
        try {
            const response = await api.post('/add', user);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getUser = createAsyncThunk(
    'user/getUser',
    async() => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(email : string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async(user: User) => {
        try {
            const response = await api.put(`/update/${user.email}`, user);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(addUser.pending, (state, action) => {
                console.log("Save user pending")
            })
            .addCase(addUser.fulfilled, (state, action) => {
                console.log("Save user fulfilled")
                state.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                console.error('Save user rejected');
            });
        builder
            .addCase(getUser.pending, (state, action) => {
                console.log("Get user pending")
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                console.error('Get user rejected');
            });
        builder
            .addCase(updateUser.pending, (state, action) => {
                console.log("Update user pending", action.payload)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const users = state.find((user: User) => user.email === action.payload.email);
                if(users){
                    users.password = action.payload.password;
                    users.role = action.payload.role;
                }
                console.log("Update user fulfilled", action.payload)
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.error('Update user rejected');
            });
        builder
            .addCase(deleteUser.pending, (state, action) => {
                console.log("Delete user pending")
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                return state = state.filter((user: User) => user.email !== action.payload.email);
                console.log("Delete user fulfilled")
            })
            .addCase(deleteUser.rejected, (state, action) => {
                console.error('Delete user rejected');
            });
    }
});

export default userSlice.reducer;
