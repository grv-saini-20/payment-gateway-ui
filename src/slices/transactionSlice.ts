import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/payment";

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },

    addOrUpdateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (tx) => tx.id === action.payload.id
      );

      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...action.payload,
        };
      } else {
        state.transactions.push(action.payload);
      }
    },

    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (tx) => tx.id !== action.payload
      );
    },

    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  setTransactions,
  addOrUpdateTransaction,
  removeTransaction,
  clearTransactions,
} = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;