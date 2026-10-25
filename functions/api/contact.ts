interface Env {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_HOSTNAMES?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const value = (name: string) => String(form.get(name) || '').trim();
  const name = value('name');
  const email = value('email');
  const phone = value('phone');
  const company = value('company');
  const service = value('service');
  const message = value('message');
  const turnstileToken = value('cf-turnstile-response');

  if (value('website')) return Response.json({ ok: true });
  if (!name || !email || !message) return Response.json({ error: 'Please provide your name, email and message.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  if ([name, email, phone, company, service, message].join('').length > 8000) return Response.json({ error: 'Your enquiry is too long.' }, { status: 400 });
  if (!env.TURNSTILE_SECRET || !env.TURNSTILE_HOSTNAMES) return Response.json({ error: 'Secure form verification is being configured.' }, { status: 503 });
  const expectedHostnames = new Set(env.TURNSTILE_HOSTNAMES.split(',').map((hostname) => hostname.trim()).filter(Boolean));
  if (!turnstileToken || turnstileToken.length > 2048 || expectedHostnames.size === 0) return Response.json({ error: 'Please complete the security check.' }, { status: 403 });

  try {
    const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: turnstileToken, remoteip: request.headers.get('CF-Connecting-IP') || '' })
    });
    if (!verificationResponse.ok) throw new Error(`Turnstile verification failed with ${verificationResponse.status}`);
    const verification = await verificationResponse.json() as { success?: boolean; action?: string; hostname?: string };
    if (!verification.success || verification.action !== 'contact' || !verification.hostname || !expectedHostnames.has(verification.hostname)) {
      return Response.json({ error: 'Security verification failed. Please try again.' }, { status: 403 });
    }
  } catch {
    return Response.json({ error: 'Security verification failed. Please try again.' }, { status: 403 });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) return Response.json({ error: 'Online delivery is being configured.' }, { status: 503 });

  const text = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not supplied'}`, `Company: ${company || 'Not supplied'}`, `Service: ${service || 'Not selected'}`, '', 'Message:', message].join('\n');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: ['info@jtkonzult.com.ng'], reply_to: email, subject: `Website enquiry from ${name}`, text })
    });
    if (!response.ok) return Response.json({ error: 'Your enquiry could not be delivered right now.' }, { status: 502 });
  } catch {
    return Response.json({ error: 'Your enquiry could not be delivered right now.' }, { status: 502 });
  }
  return Response.json({ ok: true });
};
