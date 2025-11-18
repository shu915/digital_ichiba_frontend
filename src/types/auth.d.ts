import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      provider?: "google" | "email" | undefined;
      provider_subject?: string | undefined;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: "google" | "email" | undefined;
    provider_subject?: string | undefined;
  }
}