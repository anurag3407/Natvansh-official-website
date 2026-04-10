import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";

export async function GET() {
  try {
    await dbConnect();
    const content = await SiteContent.find();
    return NextResponse.json(content);
  } catch (error: any) { console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch content" , details: error.message }, { status: 500 });
  }
}
