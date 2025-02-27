import {configureStore} from "@reduxjs/toolkit";
import formSlice from "../reducers/FormSlice.ts";
import profileSlice from "../reducers/UserSlice.ts";
import charitySlice from "../reducers/CharitySlice.ts";
import donorSlice from "../reducers/DonorSlice.ts";
import causeSlice from "../reducers/CauseSlice.ts";
import adminSlice from "../reducers/AdminSlice.ts";
import userSlice from "../reducers/UserSlice.ts";
import donationSlice from "../reducers/DonationSlice.ts";

export  const store = configureStore({
    reducer: {
        formData: formSlice,
        charity: charitySlice,
        cause: causeSlice,
        donor: donorSlice,
        admin: adminSlice,
        user: userSlice,
        profile: profileSlice,
        donation: donationSlice,
    }
})

export type AppDispatch = typeof store.dispatch;