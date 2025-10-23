import { SignJWT, importPKCS8 } from "jose";

const PRIVATE_KEY_PEM = process.env.APP_JWT_PRIVATE_KEY!.replace(/\\n/g, "\n");

type MintPayload = {
  email: string;
  provider?: "google" | "email";
  provider_subject?: string;
};

export default async function createBackendJwt({
  email,
  provider,
  provider_subject,
}: MintPayload) {
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
    .setSubject(provider_subject ?? email)
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 60)
    .sign(key);
}
