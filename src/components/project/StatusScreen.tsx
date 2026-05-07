import { PaymentStatus } from "@/types/payment";

interface StatusScreenProps {
  status: PaymentStatus;
  error?: string | null;
  attempts: number;
  onRetry: () => void;
}

export default function StatusScreen({
  status,
  error,
  attempts,
  onRetry,
}: StatusScreenProps) {
  if (status === "idle") return null;

  return (
    <div className="rounded-xl border p-6 text-center shadow">
      {status === "processing" && (
        <>
          <h2 className="text-xl font-semibold">
            Processing Payment...
          </h2>

          <p className="mt-2 text-gray-500">
            Please wait while we process your
            payment.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <h2 className="text-xl font-semibold text-green-600">
            Payment Successful
          </h2>

          <p className="mt-2">
            Your payment was completed
            successfully.
          </p>
        </>
      )}

      {(status === "failed" ||
        status === "timeout") && (
        <>
          <h2 className="text-xl font-semibold text-red-600">
            Payment {status}
          </h2>

          <p className="mt-2">
            {error}
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Attempt {attempts} of 3
          </p>

          {attempts < 3 ? (
            <button
              onClick={onRetry}
              className="mt-4 rounded bg-black px-4 py-2 text-white"
            >
              Retry Payment
            </button>
          ) : (
            <p className="mt-4 font-medium text-red-500">
              Maximum retry attempts reached.
            </p>
          )}
        </>
      )}
    </div>
  );
}