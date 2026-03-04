import { NextResponse } from "next/server";
import { toSortedWord } from "@/lib/webhook";

export async function POST(request: Request) {
  try {
    const result = toSortedWord(await request.json());
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
