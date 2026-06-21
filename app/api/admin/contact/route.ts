import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const queries = await prisma.contactQuery.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: queries,
    });
  } catch (error) {
    console.error("Error fetching contact queries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch queries" },
      { status: 500 }
    );
  }
}
