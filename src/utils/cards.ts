import { CardType } from "@/types/payment";

export const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};

export const detectCardType = (number: string): CardType => {
  const cleaned = number.replace(/\s/g, "");

  if (/^4/.test(cleaned)) {
    return "visa";
  }

  if (/^5[1-5]/.test(cleaned)) {
    return "mastercard";
  }

  if (/^3[47]/.test(cleaned)) {
    return "amex";
  }

  return "unknown";
};