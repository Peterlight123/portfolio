import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { testimonials } from "@/shared/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const approvedTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.approved, true))
      .orderBy(desc(testimonials.createdAt));

    return NextResponse.json(approvedTestimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
