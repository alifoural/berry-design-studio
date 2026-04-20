import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, whatsapp, schoolName, schoolType, service, message } = body;

  if (!name || !email || !schoolName || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const html = `
    <h2 style="color:#7c3aed">New Inquiry — Berry Design Studio</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px;font-weight:bold;width:180px">Contact Name</td><td style="padding:8px">${name}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px;font-weight:bold">WhatsApp</td><td style="padding:8px">${whatsapp || "—"}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">School / Nursery Name</td><td style="padding:8px">${schoolName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Type</td><td style="padding:8px">${schoolType || "—"}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Service Needed</td><td style="padding:8px">${service || "—"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${message.replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `;

  const { error } = await resend.emails.send({
    from: "Berry Design Studio <onboarding@resend.dev>",
    to: "sales@berrydesign.online",
    replyTo: email,
    subject: `New inquiry from ${schoolName} (${schoolType || "School"})`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
