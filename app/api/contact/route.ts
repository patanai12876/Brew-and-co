import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save contact query to database
    const query = await prisma.contactQuery.create({
      data: {
        name,
        email,
        message,
        status: "unread",
      },
    });

    // Email sending is optional - query is saved regardless
    // Admin will handle replying from the admin dashboard

    return NextResponse.json({
      success: true,
      data: query,
      message: "Thank you! We've received your message and will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact query error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error details:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage || "Failed to save contact query" },
      { status: 500 }
    );
  }
}
