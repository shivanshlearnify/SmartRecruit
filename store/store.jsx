import { configureStore } from "@reduxjs/toolkit";
import registerUserSlice from "./reducers/registerUserSlice";

const store = configureStore({
    reducer: {
        user: registerUserSlice,
    }
});

export default store;