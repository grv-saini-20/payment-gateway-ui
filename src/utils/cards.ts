import { CardType } from "@/types/payment";

export const cleanCardNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const detectCardType = (
  number: string
): CardType => {
  const cleaned = cleanCardNumber(number);

  // Visa
  if (/^4/.test(cleaned)) {
    return "visa";
  }

  // Mastercard
  if (/^5[1-5]/.test(cleaned)) {
    return "mastercard";
  }

  // Amex
  if (/^3[47]/.test(cleaned)) {
    return "amex";
  }

  return "unknown";
};

export const formatCardNumber = (
  value: string
) => {
  const cleaned = cleanCardNumber(value);

  const cardType = detectCardType(cleaned);

  // American Express → 4-6-5
  if (cardType === "amex") {
    return cleaned
      .slice(0, 15)
      .replace(
        /^(\d{0,4})(\d{0,6})(\d{0,5}).*/,
        (_, g1, g2, g3) =>
          [g1, g2, g3]
            .filter(Boolean)
            .join(" ")
      );
  }

  // Visa / Mastercard → 4-4-4-4
  return cleaned
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
};

export const formatExpiry = (
  value: string
) => {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 2) {
    return cleaned;
  }

  return `${cleaned.slice(
    0,
    2
  )}/${cleaned.slice(2, 4)}`;
};

export const maskCardNumber = (
  value: string
) => {
  const cleaned = cleanCardNumber(value);

  if (!cleaned) {
    return "•••• •••• •••• ••••";
  }

  const visibleDigits = cleaned.slice(-4);

  return `•••• •••• •••• ${visibleDigits}`;
};