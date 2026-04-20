import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Alumni from "@/lib/models/Alumni";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const alumni = await Alumni.findById(id);
    if (!alumni) return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    return NextResponse.json(alumni);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch alumni", details: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const alumni = await Alumni.findByIdAndUpdate(id, body, { new: true });
    if (!alumni) return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    return NextResponse.json(alumni);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to update alumni", details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const alumni = await Alumni.findByIdAndDelete(id);
    if (!alumni) return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    return NextResponse.json({ message: "Alumni deleted successfully" });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to delete alumni", details: error.message }, { status: 500 });
  }
}
