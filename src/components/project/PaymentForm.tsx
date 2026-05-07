"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

import CardPreview from "./CardPreview";
import StatusScreen from "./StatusScreen";

import {
  detectCardType,
  formatCardNumber,
  formatExpiry,
} from "@/utils/cards";

import {
  validateAmount,
  validateCardHolder,
  validateCardNumber,
  validateCVV,
  validateExpiry,
} from "@/utils/validations";

import { usePayment } from "@/hooks/usePayment";

export default function PaymentForm() {
  const { makePayment } = usePayment();

  const { status, error, attempts } =
    useSelector(
      (state: RootState) => state.payment
    );


  const [transactionId] = useState(
    crypto.randomUUID()
  );

  const [cardHolder, setCardHolder] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCVV] = useState("");

  const [amount, setAmount] =
    useState<number | "">("");

  const [currency, setCurrency] =
    useState<"INR" | "USD">("INR");

  const cardType = useMemo(
    () => detectCardType(cardNumber),
    [cardNumber]
  );

  const errors = {
    cardHolder: validateCardHolder(cardHolder),

    cardNumber: validateCardNumber(cardNumber),

    expiry: validateExpiry(expiry),

    cvv: validateCVV(cvv, cardType),

    amount: validateAmount(
      Number(amount)
    ),
  };

  const isFormValid = Object.values(
    errors
  ).every((error) => error === "");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      await makePayment({
        id: transactionId,
        cardHolder,
        cardNumber,
        expiry,
        cvv,
        amount: Number(amount),
        currency,
        attempts: 1,
      });
    } catch (error) {
      console.error(
        "Payment submission failed:",
        error
      );
    }
  };

  const handleRetry = async () => {
    if (attempts >= 3) return;

    try {
      await makePayment({
        id: transactionId,
        cardHolder,
        cardNumber,
        expiry,
        cvv,
        amount: Number(amount),
        currency,
        attempts: attempts + 1,
      });
    } catch (error) {
      console.error(
        "Retry payment failed:",
        error
      );
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <CardPreview
        cardHolder={cardHolder}
        cardNumber={cardNumber}
        expiry={expiry}
        cardType={cardType}
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="cardHolder"
            className="mb-1 block text-sm font-medium text-black"
          >
            Cardholder Name
          </label>

          <input
            id="cardHolder"
            type="text"
            value={cardHolder}
            onChange={(e) =>
              setCardHolder(
                e.target.value
              )
            }
            className="w-full rounded border p-2 border-gray-500 text-black"
            aria-describedby="cardHolder-error"
          />

          {errors.cardHolder && (
            <p
              id="cardHolder-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.cardHolder}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cardNumber"
            className="mb-1 block text-sm font-medium text-black"
          >
            Card Number
          </label>

          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            maxLength={19}
            onChange={(e) =>
              setCardNumber(
                formatCardNumber(
                  e.target.value
                )
              )
            }
            className="w-full rounded border p-2 border-gray-500 text-black"
            aria-describedby="cardNumber-error"
          />

          <div className="mt-1 text-sm text-gray-500">
            Card Type:{" "}
            {cardType.toUpperCase()}
          </div>

          {errors.cardNumber && (
            <p
              id="cardNumber-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="expiry"
              className="mb-1 block text-sm font-medium text-black"
            >
              Expiry
            </label>

            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={expiry}
              maxLength={5}
              onChange={(e) =>
                setExpiry(
                  formatExpiry(
                    e.target.value
                  )
                )
              }
              className="w-full rounded border p-2 border-gray-500 text-black"
              aria-describedby="expiry-error"
            />

            {errors.expiry && (
              <p
                id="expiry-error"
                className="mt-1 text-sm text-red-500"
              >
                {errors.expiry}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="cvv"
              className="mb-1 block text-sm font-medium text-black"
            >
              CVV
            </label>

            <input
              id="cvv"
              type="password"
              value={cvv}
              maxLength={
                cardType === "amex"
                  ? 4
                  : 3
              }
              onChange={(e) =>
                setCVV(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              className="w-full rounded border p-2 border-gray-500 text-black"
              aria-describedby="cvv-error"
            />

            {errors.cvv && (
              <p
                id="cvv-error"
                className="mt-1 text-sm text-red-500"
              >
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="mb-1 block text-sm font-medium text-black"
          >
            Amount
          </label>

          <div className="flex gap-2">
            <select
              value={currency}
              onChange={(e) =>
                setCurrency(
                  e.target.value as
                    | "INR"
                    | "USD"
                )
              }
              className="rounded border p-2 border-gray-500 text-black"
            >
              <option value="INR">
                INR
              </option>

              <option value="USD">
                USD
              </option>
            </select>

            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value === ""
                    ? ""
                    : Number(
                        e.target.value
                      )
                )
              }
              className="w-full rounded border p-2 border-gray-500 text-black"
              aria-describedby="amount-error"
            />
          </div>

          {errors.amount && (
            <p
              id="amount-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.amount}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={
            !isFormValid ||
            status === "processing"
          }
          className="w-full rounded bg-black px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "processing"
            ? "Processing..."
            : "Pay Now"}
        </button>
      </form>

      <StatusScreen
        status={status}
        error={error}
        attempts={attempts}
        onRetry={handleRetry}
      />
    </div>
  );
}