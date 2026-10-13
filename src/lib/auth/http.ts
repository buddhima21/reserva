import "server-only";
import { NextResponse } from "next/server";

export function authResponse(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
}

export function isSameOrigin(request: Request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function readAuthInput(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.headers.get("content-type")?.includes("application/json")) return null;
  try {
    const value = await request.json();
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch { return null; }
}

export function validEmail(value: unknown): value is string {
  return typeof value === "string" && value.trim().length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function authErrorMessage(code?: string) {
  if (code === "email_address_invalid") return "Enter a valid email address that can receive mail.";
  if (code === "email_not_confirmed") return "This account needs an administrator update before it can sign in. Contact the workspace administrator.";
  if (code === "over_request_rate_limit" || code === "over_email_send_rate_limit") return "Too many attempts. Please wait a few minutes and try again.";
  if (code === "weak_password") return "Choose a stronger password that meets your account’s password requirements.";
  if (code === "email_address_not_authorized") return "Email delivery is not configured for this address yet. Contact the workspace administrator.";
  if (code === "signup_disabled") return "Account registration is currently unavailable.";
  return "We couldn’t complete that request. Please try again.";
}
