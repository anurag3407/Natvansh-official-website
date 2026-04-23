import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import { cachedFetch, invalidateCache, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "events:all";

export async function GET() {
  try {
    const events = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return Event.find().sort({ createdAt: -1 }).lean();
      },
      CACHE_TTL.SHORT
    );

    return NextResponse.json(events, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch events", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const event = await Event.create(body);

    invalidateCache(CACHE_KEY);

    return NextResponse.json(event, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create event", details: message }, { status: 500 });
  }
}
