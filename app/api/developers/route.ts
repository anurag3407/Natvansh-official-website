import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Developer from "@/lib/models/Developer";
import { cachedFetch, invalidateCache, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "developers:all";

export async function GET() {
  try {
    const developers = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return Developer.find().sort({ order: 1 }).lean();
      },
      CACHE_TTL.LONG
    );

    return NextResponse.json(developers, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch developers", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const developer = await Developer.create(body);

    invalidateCache(CACHE_KEY);

    return NextResponse.json(developer, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create developer", details: message }, { status: 500 });
  }
}
