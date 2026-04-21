import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/lib/models/TeamMember";
import { cachedFetch, invalidateCache, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "team:all";

export async function GET() {
  try {
    const members = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return TeamMember.find().sort({ position: 1, order: 1 }).lean();
      },
      CACHE_TTL.MEDIUM
    );

    return NextResponse.json(members, {
      headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=1200" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch team", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const member = await TeamMember.create(body);

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(member, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create member", details: message }, { status: 500 });
  }
}
