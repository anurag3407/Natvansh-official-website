import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";
import { cachedFetch, invalidateCache, invalidateCacheByPrefix, CACHE_TTL } from "@/lib/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const cacheKey = `content:${section}`;

    const content = await cachedFetch(
      cacheKey,
      async () => {
        await dbConnect();
        return SiteContent.findOne({ section }).lean();
      },
      CACHE_TTL.MEDIUM
    );

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content, {
      headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=1200" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch content", details: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { section } = await params;
    await dbConnect();
    const body = await request.json();
    const content = await SiteContent.findOneAndUpdate(
      { section },
      { ...body, section },
      { new: true, upsert: true }
    );

    // Invalidate both the specific section cache and the "all content" cache
    await invalidateCache(`content:${section}`);
    await invalidateCache("content:all");

    return NextResponse.json(content);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update content", details: message }, { status: 500 });
  }
}
