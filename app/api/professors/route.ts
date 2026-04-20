import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Professor from "@/lib/models/Professor";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const current = searchParams.get("current");

    let query = {};
    if (current === "true") {
      query = { isCurrent: true };
    }

    const professors = await Professor.find(query).sort({ order: 1 });
    return NextResponse.json(professors);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch professors", details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();

    const professor = await Professor.create(body);
    return NextResponse.json(professor, { status: 201 });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to create professor", details: error.message }, { status: 500 });
  }
}
