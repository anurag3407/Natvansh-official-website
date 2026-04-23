import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Alumni from "@/lib/models/Alumni";

export async function GET() {
  try {
    await dbConnect();
    const alumni = await Alumni.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(alumni);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch alumni", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const alumni = await Alumni.create(body);

    return NextResponse.json(alumni, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create alumni", details: message }, { status: 500 });
  }
}
