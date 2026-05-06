import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentStatus } from "@/types/payment";
import { error } from "console";

interface PaymentState {
    status: PaymentStatus;
    error: string | null;
    attempts: number;
    currentTransactionId: string | null;
}

const initialState: PaymentState = {
    status: "idle",
    error: null,
    attempts: 0,
    currentTransactionId: null,
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        startPayment: (state, action: PayloadAction<string>) => {
            state.status = "processing";
            state.currentTransactionId = action.payload;
            state.attempts += 1;
            state.error = null;
        },
        paymentSuccess: (state, action: PayloadAction<string>) => {
            state.status = "success";
        },
        paymentFailed: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        },
        paymentTimeout: (state) => {
            state.status = "timeout";
            state.error = "Payment timed out. Please try again.";
        },
        resetPayment: (state) => {
            state.status = "idle";
            state.error = null;
            state.attempts = 0;
            state.currentTransactionId = null;
        }
    }
})

export const { startPayment, paymentSuccess, paymentFailed, paymentTimeout, resetPayment } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
