# Payment Gateway UI — Next.js + Redux Toolkit

A frontend payment gateway simulation built with **Next.js App Router**, **TypeScript**, and **Redux Toolkit**.

This project demonstrates a complete payment lifecycle including:

- Real-time form validation
- Card type detection
- Live card preview
- Payment processing simulation
- Timeout handling using `AbortController`
- Retry logic with idempotency
- Persistent transaction history
- Responsive and accessible UI

---

# 🚀 Features

## ✅ Payment Form
- Cardholder name input
- Card number formatting (`4242 4242 4242 4242`)
- Expiry validation (`MM/YY`)
- CVV validation
- Currency selector (`INR`, `USD`)
- Real-time field validation
- Disabled submit button until form is valid

---

## 💳 Card Handling
- Detects:
  - Visa
  - Mastercard
  - American Express
- Dynamic CVV validation:
  - 3 digits for Visa/Mastercard
  - 4 digits for Amex
- Live card preview updates while typing

---

## 🔄 Payment Lifecycle
Supports all payment states:

- Idle
- Processing
- Success
- Failed
- Timeout

---

## 🌐 Mock Payment Gateway
Implemented using a Next.js Route Handler:

```ts
/api/pay
```

Randomized server-side responses:

| Outcome | Probability |
|---|---|
| Success | ~60% |
| Failed | ~25% |
| Timeout | ~15% |

Timeout responses are delayed intentionally to simulate slow networks.

---

## ⏱ Timeout Handling
Frontend cancels requests after **6 seconds** using:

```ts
AbortController
```

---

## 🔁 Retry Logic
- Retry available for failed/time-out payments
- Maximum 3 attempts
- Same transaction ID reused across retries
- Prevents duplicate history entries

---

## 📜 Transaction History
- Stores:
  - Transaction ID
  - Amount
  - Status
  - Timestamp
  - Attempt count
- Persisted using `localStorage`
- Clickable transaction details view

---

## 🧠 State Management
Implemented using **Redux Toolkit**.

Global state includes:
- Payment lifecycle
- Retry attempts
- Transaction history
- Shared payment state

---

# 🛠 Tech Stack

- Next.js 15 (App Router)
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS

---

# 📁 Folder Structure

```bash
src/
├── app/
│   ├── api/
│   │   └── pay/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── payment/
│   │   ├── CardPreview.tsx
│   │   ├── PaymentForm.tsx
│   │   └── StatusScreen.tsx
│   │
│   └── projects/
│       ├── TransactionDetails.tsx
│       └── TransactionHistory.tsx
│
├── hooks/
│   └── usePayment.ts
│
├── slices/
│   ├── paymentSlice.ts
│   └── transactionSlice.ts
│
├── store/
│   └── store.ts
│
├── types/
│   └── payment.ts
│
├── utils/
│   ├── cards.ts
│   └── validations.ts
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

---

## 4️⃣ Open Browser

```bash
http://localhost:3000
```

---

# 🧪 Test Cards

## Visa
```txt
4242 4242 4242 4242
```

## Mastercard
```txt
5555 5555 5555 4444
```

## American Express
```txt
3782 822463 10005
```

---

# 🧱 Architecture Decisions

## Why Redux Toolkit?
Redux Toolkit was chosen because:
- Centralized global payment lifecycle
- Retry state shared across components
- Transaction history persistence
- Predictable state management

---

## Why Route Handlers?
Next.js Route Handlers simulate a real payment gateway without external SDKs.

This keeps the assignment:
- self-contained
- testable
- realistic

---

## Why AbortController?
Used to simulate real-world timeout handling and slow network behavior.

---

# ♿ Accessibility
Implemented:
- visible labels
- `aria-describedby`
- keyboard-friendly form controls
- disabled states
- focus-safe interactions

---

# 📱 Responsiveness
UI supports:
- Mobile (`375px`)
- Tablet
- Desktop (`1280px+`)

---

# ⚠️ Assumptions
- This is a frontend simulation only
- No real payment processing occurs
- Card data is not securely stored
- CVV handling is for demo purposes only

---

# 🔮 Future Improvements
Given more time, I would add:

- Luhn algorithm validation
- Animated payment transitions
- Skeleton loaders
- Better transaction filtering
- Unit tests + integration tests
- Redux persistence middleware
- Dark mode support
- Secure backend tokenization
- Better accessibility focus management

---

# 📄 License
This project is for assessment/demo purposes only.
