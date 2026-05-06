export type PaymentStatus =
  | "idle"
  | "processing"
  | "success"
  | "failed"
  | "timeout";

export type CardType = "visa" | "mastercard" | "amex" | "unknown";

export interface PaymentPayload {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: "INR" | "USD";
}

export interface Transaction {
  id: string;
  amount: number;
  status: PaymentStatus;
  timestamp: string;
  attempts: number;
}