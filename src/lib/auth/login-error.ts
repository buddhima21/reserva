import { authErrorMessage } from "./http";

type LoginError = { code?: string; status?: number; message?: string };

export function loginErrorResponse(error: LoginError) {
  // Older Auth responses can omit the code even for invalid credentials.
  const providerCode = error.code ?? (error.message === "Invalid login credentials" ? "invalid_credentials" : undefined);
  const code = providerCode && /^[a-z0-9_]{1,80}$/.test(providerCode)
    ? providerCode
    : `auth_http_${Number.isInteger(error.status) && error.status! >= 100 && error.status! <= 599 ? error.status : "unknown"}`;
  const temporary = !error.status || error.status >= 500 || error.status === 0;
  const status = error.status === 429 ? 429 : temporary ? 503 : code === "invalid_credentials" ? 401 : 400;
  const message = code === "invalid_credentials"
    ? "The email or password is incorrect."
    : status === 429
      ? "Too many attempts. Please wait a few minutes and try again."
      : temporary
        ? "Sign in is temporarily unavailable. Please try again."
        : authErrorMessage(providerCode);

  return { status, body: { error: `${message} (Code: ${code})`, code } };
}
