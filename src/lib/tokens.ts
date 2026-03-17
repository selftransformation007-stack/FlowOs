import { randomBytes } from "crypto";
import { db } from "./prisma";

const TTL_MINUTES = 15;

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export async function createToken(email: string): Promise<string> {
  await db.passwordResetToken.deleteMany({ where: { email } });

  const token = generateToken();
  const expires = new Date(Date.now() + TTL_MINUTES * 60 * 1000);
  await db.passwordResetToken.create({
    data: { email, token, expires },
  });

  return token;
}

export async function validateTOken(token: string): Promise<string | null> {
  const record = await db.passwordResetToken.findUnique({
    where: { token },
    select: { email: true, expires: true },
  });

  if (!record) return null;

  if (record.expires < new Date()) {
    await db.passwordResetToken.delete({ where: { token } }).catch(() => {});
    return null;
  }

  return record.email;
}

export async function consumeToken(token: string): Promise<void> {
  await db.passwordResetToken.delete({ where: { token } }).catch(() => {});
}
