import { NextRequest, NextResponse } from "next/server";
import { prisma, withRetry } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    const menuItems = await withRetry(() =>
      prisma.menuItem.findMany({
        where: {
          available: true,
          ...(category && category !== "All" ? { category } : {}),
        },
        take: limit ? parseInt(limit) : undefined,
        orderBy: { name: "asc" },
      })
    );

    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    console.error("Menu fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}