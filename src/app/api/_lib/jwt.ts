import { SignJWT, importPKCS8 } from "jose";

const PRIVATE_KEY_PEM = process.env.APP_JWT_PRIVATE_KEY!.replace(/\\n/g, "\n");

export async function mintUserJWT(email: string) {
  const key = await importPKCS8(PRIVATE_KEY_PEM, "RS256");
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ email })               // 任意クレーム
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer("digital-ichiba-next")
    .setAudience("digital-ichiba-rails")
    .setSubject(email)
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 5)               // 5分
    .sign(key);
}