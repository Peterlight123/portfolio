import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { contacts } from "@/shared/schema";
import { contactFormSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactFormSchema.parse(body);

    await db.insert(contacts).values({
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      subject: validatedData.subject.trim(),
      message: validatedData.message.trim(),
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
