import { useDispatch } from "react-redux";
import {
  startPayment,
  paymentSuccess,
  paymentFailed,
  paymentTimeout,
} from "@/slices/paymentSlice";

import { addOrUpdateTransaction } from "@/slices/transactionSlice";

import { PaymentPayload, PaymentStatus } from "@/types/payment";

export const usePayment = () => {
  const dispatch = useDispatch();

  const makePayment = async (
    payload: PaymentPayload & { attempts: number }
  ) => {
    const controller = new AbortController();

    let transactionStatus: PaymentStatus = "processing";

    const timeout = setTimeout(() => {
      controller.abort();
    }, 6000);

    try {
      dispatch(startPayment(payload.id));

      const res = await fetch("/api/pay", {
        method: "POST",
        signal: controller.signal,
      });

      const data = await res.json();

      if (data.status === "success") {
        transactionStatus = "success";
        dispatch(paymentSuccess(data));
      } else {
        transactionStatus = "failed";
        dispatch(paymentFailed(data.reason));
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        transactionStatus = "timeout";
        dispatch(paymentTimeout());
      } else {
        transactionStatus = "failed";
        dispatch(paymentFailed("Network error. Please try again."));
      }
    } finally {
      clearTimeout(timeout);

      dispatch(
        addOrUpdateTransaction({
          id: payload.id,
          amount: payload.amount,
          status: transactionStatus,
          timestamp: new Date().toISOString(),
          attempts: payload.attempts,
        })
      );
    }
  };

  return { makePayment };
};