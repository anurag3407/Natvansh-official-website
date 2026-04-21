import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";
import { cachedFetch, invalidateCache, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "gallery:all";

export async function GET() {
  try {
    const images = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return GalleryImage.find().sort({ order: 1, createdAt: -1 }).lean();
      },
      CACHE_TTL.MEDIUM
    );

    return NextResponse.json(images, {
      headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=1200" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch gallery", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const image = await GalleryImage.create(body);

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(image, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to create gallery image", details: message }, { status: 500 });
  }
}
