import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";
import { cachedFetch, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "content:all";

export async function GET() {
  try {
    const content = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return SiteContent.find().lean();
      },
      CACHE_TTL.MEDIUM
    );

    return NextResponse.json(content, {
      headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=1200" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch content", details: message }, { status: 500 });
  }
}
