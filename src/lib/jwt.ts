import { SignJWT, importPKCS8 } from "jose";

const PRIVATE_KEY_PEM = process.env.APP_JWT_PRIVATE_KEY!.replace(/\\n/g, "\n");

type MintPayload = {
  email: string;                 // アプリ内の主IDとして使う
  provider?: "google" | "email"; // 任意
  provider_subject?: string;     // Googleのsubなど（任意）
};

export async function mintUserJWT({ email, provider, provider_subject }: MintPayload) {
  const key = await importPKCS8(PRIVATE_KEY_PEM, "RS256");
  const now = Math.floor(Date.now() / 1000);

  return await new SignJWT({
      email,
      provider,
      provider_subject,
    })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer("digital-ichiba-next")
    .setAudience("digital-ichiba-rails")
    .setSubject(provider_subject ?? email)           // ← sub は「このユーザー」を一意に指す値に統一
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 60 * 24 * 30)
    .sign(key);
}