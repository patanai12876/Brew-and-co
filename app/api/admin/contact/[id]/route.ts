import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    console.log("PATCH /api/admin/contact/[id]:", { id, status });

    const validStatuses = ["unread", "read", "replied"];

    if (!validStatuses.includes(status)) {
      console.error("Invalid status provided:", status);
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    console.log("Attempting to update query:", id, "with status:", status);
    const query = await prisma.contactQuery.update({
      where: { id },
      data: { status },
    });

    console.log("Query updated successfully:", query);
    return NextResponse.json({ success: true, data: query });
  } catch (error) {
    console.error("Contact query update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update query", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.contactQuery.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact query delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete query" },
      { status: 500 }
    );
  }
}
