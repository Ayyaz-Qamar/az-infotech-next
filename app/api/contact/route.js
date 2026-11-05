export async function POST(req) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, error: 'missing key' }, { status: 500 });

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

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    console.error('Resend error', r.status, err);
    return Response.json({ ok: false, resendStatus: r.status, error: err.message || 'unknown' }, { status: 502 });
  }
  return Response.json({ ok: true });
}