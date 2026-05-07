import { CardType } from "@/types/payment";

export const validateCardHolder = (name: string) => {
  if (!name.trim()) return "Cardholder name is required";
  return "";
};

export const validateCardNumber = (number: string) => {
  const cleaned = number.replace(/\s/g, "");

  if (cleaned.length < 16) {
    return "Card number must be 16 digits";
  }

  return "";
};

export const validateExpiry = (expiry: string) => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return "Expiry must be MM/YY";
  }

  const [month, year] = expiry.split("/").map(Number);

  if (month < 1 || month > 12) {
    return "Invalid month";
  }

  const currentDate = new Date();

  const currentYear = Number(
    currentDate.getFullYear().toString().slice(-2)
  );

  const currentMonth = currentDate.getMonth() + 1;

  if (
    year < currentYear ||
    (year === currentYear && month < currentMonth)
  ) {
    return "Card has expired";
  }

  return "";
};

export const validateCVV = (
  cvv: string,
  cardType: CardType
) => {
  if (cardType === "amex") {
    return /^\d{4}$/.test(cvv)
      ? ""
      : "Amex CVV must be 4 digits";
  }

  return /^\d{3}$/.test(cvv)
    ? ""
    : "CVV must be 3 digits";
};

export const validateAmount = (amount: number) => {
  if (!amount || amount <= 0) {
    return "Amount must be greater than 0";
  }

  return "";
};