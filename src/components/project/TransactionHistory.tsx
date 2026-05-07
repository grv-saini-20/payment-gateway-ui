"use client";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";

import {
  setTransactions,
} from "@/slices/transactionSlice";

import { Transaction } from "@/types/payment";

interface TransactionHistoryProps {
  onSelect: (transaction: Transaction) => void;
}

export default function TransactionHistory({
  onSelect,
}: TransactionHistoryProps) {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state: RootState) =>
      state.transaction.transactions
  );

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "transactions"
        );

      if (stored) {
        dispatch(
          setTransactions(
            JSON.parse(stored)
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to load transactions",
        error
      );
    }
  }, [dispatch]);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  if (!transactions.length) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-gray-500">
          No transactions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Transaction History
      </h2>

      <div className="space-y-3">
        {transactions
          .slice()
          .reverse()
          .map((tx) => (
            <button
              key={tx.id}
              onClick={() =>
                onSelect(tx)
              }
              className="w-full rounded-xl border p-4 text-left transition hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    ₹ {tx.amount}
                  </p>

                  <p className="text-sm text-gray-500">
                    {tx.id.slice(
                      0,
                      12
                    )}
                    ...
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`rounded px-3 py-1 text-sm font-medium ${
                      tx.status ===
                      "success"
                        ? "bg-green-100 text-green-700"
                        : tx.status ===
                            "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>

                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(
                      tx.timestamp
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}