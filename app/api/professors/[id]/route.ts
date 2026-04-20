import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Professor from "@/lib/models/Professor";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const professor = await Professor.findById(id);
    if (!professor) return NextResponse.json({ error: "Professor not found" }, { status: 404 });
    return NextResponse.json(professor);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch professor", details: error.message }, { status: 500 });
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
    const professor = await Professor.findByIdAndUpdate(id, body, { new: true });
    if (!professor) return NextResponse.json({ error: "Professor not found" }, { status: 404 });
    return NextResponse.json(professor);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to update professor", details: error.message }, { status: 500 });
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
    const professor = await Professor.findByIdAndDelete(id);
    if (!professor) return NextResponse.json({ error: "Professor not found" }, { status: 404 });
    return NextResponse.json({ message: "Professor deleted successfully" });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to delete professor", details: error.message }, { status: 500 });
  }
}
