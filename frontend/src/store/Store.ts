import {configureStore} from "@reduxjs/toolkit";
import formSlice from "../reducers/FormSlice.ts";
import profileSlice from "../reducers/ProfileSlice.ts";
import charitySlice from "../reducers/CharitySlice.ts";
import donorSlice from "../reducers/DonorSlice.ts";
import causeSlice from "../reducers/CauseSlice.ts";
import adminSlice from "../reducers/AdminSlice.ts";

export  const store = configureStore({
    reducer: {
        formData: formSlice,
        charity: charitySlice,
        cause: causeSlice,
        donor: donorSlice,
        admin: adminSlice,
        profile: profileSlice,
    }
})