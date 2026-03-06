import resend from '../config/mailer';

export async function sendOtpEmail(to: string, otp: string): Promise<void> {
  const from = process.env.RESEND_FROM || 'noreply@mystore.it';

  await resend.emails.send({
    from,
    to,
    subject: 'Il tuo codice di verifica MyStore',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f9f9f9;border-radius:8px;">
        <h2 style="margin:0 0 16px;color:#111;">Verifica la tua email</h2>
        <p style="margin:0 0 24px;color:#444;">Usa il codice qui sotto per completare la registrazione su MyStore. Il codice è valido per <strong>10 minuti</strong>.</p>
        <div style="text-align:center;background:#fff;border:2px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:24px;">
          <span style="font-size:40px;font-weight:700;letter-spacing:12px;color:#111;">${otp}</span>
        </div>
        <p style="margin:0;color:#888;font-size:13px;">Se non hai richiesto questo codice, ignora questa email.</p>
      </div>
    `,
  });
}
