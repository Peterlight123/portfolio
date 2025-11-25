import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { newsletter } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { newsletterSchema } from "@/lib/validations";
import { ZodError } from "zod";
import { getResendClient } from "@/lib/resend-client";

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

    // Send email notification
    try {
      const { client: resend, fromEmail } = await getResendClient();
      
      await resend.emails.send({
        from: fromEmail,
        to: 'petereluwade55@gmail.com',
        subject: 'New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${emailLower}</p>
          <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p><small>Sent from your portfolio website</small></p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the request if email fails
    }

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
