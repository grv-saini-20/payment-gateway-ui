import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/payment";

const loadFromLocalStorage = (): Transaction[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedState = localStorage.getItem("transactions");
    return storedState ? JSON.parse(storedState) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (transactions: Transaction[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("transactions", JSON.stringify(transactions));
};

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: loadFromLocalStorage(),
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      saveToStorage(state.transactions);
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

      saveToStorage(state.transactions);
    },

    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (tx) => tx.id !== action.payload
      );

      saveToStorage(state.transactions);
    },

    clearTransactions: (state) => {
      state.transactions = [];
      saveToStorage(state.transactions);
    },
  },
});

export const {
  setTransactions,
  addOrUpdateTransaction,
  removeTransaction,
  clearTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;