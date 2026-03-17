// ─────────────────────────────────────────────────────────────
// src/lib/mail.ts
//
// Transactional email sending via Resend.
// Three emails sent in the auth flow:
//
//   sendWelcomeEmail()             ← after successful registration
//   sendPasswordResetEmail()       ← forgot-password flow
//   sendEmailChangeVerification()  ← email-change flow (Settings)
//
// All are fire-and-forget in server actions — always .catch() so
// email errors never block the user.
//
// Install:  npm install resend
//
// Env vars required:
//   RESEND_API_KEY         — from resend.com dashboard
//   NEXT_PUBLIC_APP_URL    — e.g. https://flowos.app
// ─────────────────────────────────────────────────────────────

import { Resend } from "resend";

const resend  = new Resend(process.env.RESEND_API_KEY!);
const FROM    = "FlowOS <noreply@flowos.app>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────

/** Sends an email and throws on Resend API error. */
async function sendEmail(
  options: Parameters<typeof resend.emails.send>[0]
): Promise<void> {
  const { error } = await resend.emails.send(options);
  if (error) throw new Error(`[mail] Resend error: ${error.message}`);
}

/** Wraps content in the shared dark-mode HTML shell. */
function shell(body: string): string {
  return `
    <div style="
      font-family: 'DM Sans', Arial, sans-serif;
      max-width: 480px; margin: 0 auto;
      padding: 40px 24px;
      background: #0C0F1A; color: #F1F0FF;
      border-radius: 12px;
    ">
      <div style="margin-bottom: 36px;">
        <span style="font-size: 20px; font-weight: 700; letter-spacing: -0.5px; color: #F1F0FF;">
          FlowOS
        </span>
      </div>

      ${body}

      <div style="
        margin-top: 40px; padding-top: 20px;
        border-top: 1px solid rgba(255,255,255,0.07);
        font-size: 11px; color: #3D3B58; line-height: 1.6;
      ">
        You're receiving this because you have a FlowOS account.<br />
        FlowOS · Personal Productivity Platform
      </div>
    </div>
  `;
}

/** Renders a primary CTA button. */
function btn(href: string, label: string): string {
  return `
    <a href="${href}" style="
      display: inline-block;
      background: #6D28D9; color: #ffffff;
      font-size: 14px; font-weight: 600;
      text-decoration: none;
      padding: 13px 28px; border-radius: 10px;
      letter-spacing: -0.1px;
    ">${label}</a>
  `;
}

// ─────────────────────────────────────────────────────────────
// 1. WELCOME EMAIL
// Triggered: immediately after registerAction succeeds.
// ─────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(
  email: string,
  name:  string
): Promise<void> {
  const url = `${APP_URL}/dashboard`;

  await sendEmail({
    from:    FROM,
    to:      email,
    subject: "Welcome to FlowOS 🎉",
    html: shell(`
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 10px; letter-spacing: -0.5px;">
        Welcome, ${name} 👋
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: #9B98B8; margin: 0 0 8px;">
        Your FlowOS workspace is ready.
      </p>
      <p style="font-size: 15px; line-height: 1.7; color: #9B98B8; margin: 0 0 32px;">
        Start building better habits, tracking deep work, and turning
        your intentions into consistent daily action.
      </p>
      ${btn(url, "Open your workspace")}
      <p style="font-size: 12px; color: #3D3B58; margin: 24px 0 0;">
        Or go to: <span style="color: #6B6880;">${url}</span>
      </p>
    `),
  });
}

// ─────────────────────────────────────────────────────────────
// 2. PASSWORD RESET EMAIL
// Triggered: forgotPasswordAction when user email is found.
// Token TTL: 15 minutes (enforced in tokens.ts).
// ─────────────────────────────────────────────────────────────

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const url = `${APP_URL}/reset-password?token=${token}`;

  await sendEmail({
    from:    FROM,
    to:      email,
    subject: "Reset your FlowOS password",
    html: shell(`
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 10px; letter-spacing: -0.5px;">
        Reset your password
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: #9B98B8; margin: 0 0 32px;">
        We received a request to reset the password for your FlowOS account.
        Click the button below to choose a new password. This link expires in
        <strong style="color: #F1F0FF;">15 minutes</strong>.
      </p>
      ${btn(url, "Reset password")}
      <p style="font-size: 13px; color: #4B4968; margin: 28px 0 8px;">
        If you didn't request this, you can safely ignore this email.
        Your password will not change.
      </p>
      <p style="font-size: 12px; color: #3D3B58; margin: 0;">
        Or copy this link: <span style="color: #6B6880;">${url}</span>
      </p>
    `),
  });
}

// ─────────────────────────────────────────────────────────────
// 3. EMAIL CHANGE VERIFICATION
// Triggered: changeEmailRequestAction — sent to the NEW address.
// The change is NOT applied until the user clicks this link.
// Token TTL: 15 minutes.
// ─────────────────────────────────────────────────────────────

export async function sendEmailChangeVerification(
  newEmail: string,
  token:    string
): Promise<void> {
  const url = `${APP_URL}/settings/confirm-email?token=${token}`;

  await sendEmail({
    from:    FROM,
    to:      newEmail,
    subject: "Confirm your new FlowOS email address",
    html: shell(`
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 10px; letter-spacing: -0.5px;">
        Confirm your new email
      </h1>
      <p style="font-size: 15px; line-height: 1.7; color: #9B98B8; margin: 0 0 32px;">
        You requested to change your FlowOS email address to this one.
        Click the button below to confirm the change. This link expires in
        <strong style="color: #F1F0FF;">15 minutes</strong>.
      </p>
      ${btn(url, "Confirm email change")}
      <p style="font-size: 13px; color: #4B4968; margin: 28px 0 8px;">
        If you didn't request this, you can safely ignore this email.
        Your email address will not change.
      </p>
      <p style="font-size: 12px; color: #3D3B58; margin: 0;">
        Or copy this link: <span style="color: #6B6880;">${url}</span>
      </p>
    `),
  });
}