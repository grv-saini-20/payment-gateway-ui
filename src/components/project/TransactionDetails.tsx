import { Transaction } from "@/types/payment";

interface TransactionDetailsProps {
  transaction: Transaction | null;
}

export default function TransactionDetails({
  transaction,
}: TransactionDetailsProps) {
  if (!transaction) return null;

  return (
    <div className="rounded-xl border p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-black">
        Transaction Details
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">
            Transaction ID
          </p>

          <p className="break-all font-medium text-black">
            {transaction.id}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="font-medium text-black">
            ₹ {transaction.amount}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="font-medium capitalize text-black">
            {transaction.status}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Attempts
          </p>

          <p className="font-medium text-black">
            {transaction.attempts}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Timestamp
          </p>

          <p className="font-medium text-black">
            {new Date(
              transaction.timestamp
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}