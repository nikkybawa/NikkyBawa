import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure RESEND_API_KEY is in your .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, inquiryType, service, date, time } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isBooking = inquiryType === 'booking';
    const subjectTitle = isBooking ? 'New Appointment Request' : 'New Contact Inquiry';

    // Build the HTML email content
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #B76E79; border-bottom: 2px solid #FDFBF9; padding-bottom: 10px;">
          ${subjectTitle}
        </h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
    `;

    if (isBooking) {
      htmlContent += `
        <h3 style="color: #666; margin-top: 20px;">Requested Details</h3>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <p><strong>Date:</strong> ${date || 'Not specified'}</p>
        <p><strong>Time:</strong> ${time || 'Not specified'}</p>
      `;
    }

    htmlContent += `
        <h3 style="color: #666; margin-top: 20px;">Message/Notes</h3>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #B76E79;">
          ${message ? message.replace(/\n/g, '<br/>') : '<em>No message provided.</em>'}
        </p>
        <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
          This message was sent from the Nikky Bawa Ladies Salon website contact form.
        </p>
      </div>
    `;

    // Send email using Resend
    // Important: you must have a verified domain on Resend to send from your own domain.
    // For testing, onboarding@resend.dev works but only sends to the email associated with the Resend account.
    const { data, error } = await resend.emails.send({
      from: 'Nikky Bawa Website <onboarding@resend.dev>', // Update this when you have a verified domain
      to: ['yhpadwords@gmail.com'], // Primary salon email
      subject: `${subjectTitle} from ${name}`,
      replyTo: email,
      html: htmlContent,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
