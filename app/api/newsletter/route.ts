import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { newsletter } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { newsletterSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = newsletterSchema.parse(body);
    const emailLower = validatedData.email.toLowerCase().trim();

    const existing = await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.email, emailLower))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    await db.insert(newsletter).values({ email: emailLower });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid email address", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
