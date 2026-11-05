export async function POST(req) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false }, { status: 500 });

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'AZ Info Tech Website <onboarding@resend.dev>',
      to: ['infotechsolutionsaz@gmail.com'],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
}