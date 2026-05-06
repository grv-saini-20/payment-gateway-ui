import { NextResponse } from "next/server";

export async function POST() {
  const random = Math.random();

  // 60% success
  if (random < 0.6) {
    return NextResponse.json({ status: "success" });
  }

  // 25% failure
  if (random < 0.85) {
    return NextResponse.json({
      status: "failed",
      reason: "Insufficient funds",
    });
  }

  // 15% timeout simulation (8 sec delay)
  await new Promise((res) => setTimeout(res, 8000));

  return NextResponse.json({ status: "timeout" });
}