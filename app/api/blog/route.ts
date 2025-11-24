import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { blogPosts } from "@/shared/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const publishedPosts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));

    return NextResponse.json(publishedPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
