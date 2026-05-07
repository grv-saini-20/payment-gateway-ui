import { configureStore } from "@reduxjs/toolkit";
import { paymentReducer } from "@/slices/paymentSlice";
import { transactionReducer } from "@/slices/transactionSlice";

const store = configureStore({
    reducer: {
        payment: paymentReducer,
        transaction: transactionReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;