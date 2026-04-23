import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Professor from "@/lib/models/Professor";
import { cachedFetch, invalidateCacheByPrefix, CACHE_TTL } from "@/lib/cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const current = searchParams.get("current");

    const cacheKey = current === "true" ? "professors:current" : "professors:all";

    const professors = await cachedFetch(
      cacheKey,
      async () => {
        await dbConnect();
        const query = current === "true" ? { isCurrent: true } : {};
        return Professor.find(query).sort({ order: 1 }).lean();
      },
      CACHE_TTL.MEDIUM
    );

    return NextResponse.json(professors, {
      headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=1200" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch professors", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const professor = await Professor.create(body);

    invalidateCacheByPrefix("professors:");

    return NextResponse.json(professor, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create professor", details: message }, { status: 500 });
  }
}
