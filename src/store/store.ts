import { configureStore } from "@reduxjs/toolkit";
import { paymentReducer } from "@/slices/paymentSlice";
import { transactionReducer } from "@/slices/transactionSlice";

const store = configureStore({
    reducer: {
        payment: paymentReducer,
        transactions: transactionReducer
    }
})

export default store;