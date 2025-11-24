import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { projects } from "@/shared/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));

    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
