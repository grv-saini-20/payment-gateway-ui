"use client";

import { useState } from "react";
import PaymentForm from "@/components/project/PaymentForm";
import TransactionHistory from "@/components/project/TransactionHistory";
import TransactionDetails from "@/components/project/TransactionDetails";
import { Transaction } from "@/types/payment";

export default function HomePage() {
  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState<Transaction | null>(
    null
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div>
          <PaymentForm />
        </div>

        <div className="space-y-6">
          <TransactionHistory
            onSelect={
              setSelectedTransaction
            }
          />

          <TransactionDetails
            transaction={
              selectedTransaction
            }
          />
        </div>
      </div>
    </main>
  );
}