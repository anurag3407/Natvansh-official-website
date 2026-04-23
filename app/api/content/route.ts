import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";

export async function GET() {
  try {
    await dbConnect();
    const content = await SiteContent.find().lean();
    return NextResponse.json(content);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch content", details: message }, { status: 500 });
  }
}
