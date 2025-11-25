import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { contacts } from "@/shared/schema";
import { contactFormSchema } from "@/lib/validations";
import { ZodError } from "zod";
import { getResendClient } from "@/lib/resend-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactFormSchema.parse(body);

    const contactData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      subject: validatedData.subject.trim(),
      message: validatedData.message.trim(),
    };

    // Save to database
    await db.insert(contacts).values(contactData);

    // Send email notification
    try {
      const { client: resend, fromEmail } = await getResendClient();
      
      await resend.emails.send({
        from: fromEmail,
        to: 'petereluwade55@gmail.com',
        subject: `New Contact Form: ${contactData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${contactData.name} (${contactData.email})</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Sent from your portfolio website</small></p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the request if email fails
    }

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
