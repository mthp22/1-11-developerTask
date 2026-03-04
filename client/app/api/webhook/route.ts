import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = body?.data;

    if (typeof data !== "string") {
      return NextResponse.json({ error: 'Invalid payload. Expected {"data":"string"}.' }, { status: 400 });
    }

    const word = data.split("").sort((a: string, b: string) => a.localeCompare(b));
    return NextResponse.json({ word });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
