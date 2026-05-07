import { CardType } from "@/types/payment";

interface CardPreviewProps {
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cardType: CardType;
}

export default function CardPreview({
  cardHolder,
  cardNumber,
  expiry,
  cardType,
}: CardPreviewProps) {
  const maskedNumber =
    cardNumber || "•••• •••• •••• ••••";

  return (
    <div className="w-full max-w-md rounded-2xl bg-linear-to-r from-slate-900 to-slate-700 p-6 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Payment Card
        </h2>

        <span className="rounded bg-white/20 px-3 py-1 text-sm uppercase">
          {cardType}
        </span>
      </div>

      <div className="mt-10 text-2xl tracking-widest">
        {maskedNumber}
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-xs opacity-70">
            Card Holder
          </p>

          <p className="text-base uppercase tracking-wide">
            {cardHolder || "YOUR NAME"}
          </p>
        </div>

        <div>
          <p className="text-xs opacity-70">
            Expires
          </p>

          <p className="text-base">
            {expiry || "MM/YY"}
          </p>
        </div>
      </div>
    </div>
  );
}