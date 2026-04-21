import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Alumni from "@/lib/models/Alumni";
import { cachedFetch, invalidateCache, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "alumni:all";

export async function GET() {
  try {
    const alumni = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return Alumni.find({}).sort({ order: 1 }).lean();
      },
      CACHE_TTL.LONG
    );

    return NextResponse.json(alumni, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" },
    });
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

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(alumni, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create alumni", details: message }, { status: 500 });
  }
}
