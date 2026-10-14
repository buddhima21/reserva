export const SIGN_OUT_EVENT = "reserva:sign-out";

export async function signOutCurrentBrowser(
  storage: Pick<Storage, "setItem">,
  navigate: () => void,
  fetcher: typeof fetch = fetch,
  signal: AbortSignal = AbortSignal.timeout(15000),
) {
  const response = await fetcher("/api/auth/logout", { method: "POST", cache: "no-store", signal });
  if (!response.ok) throw new Error("Sign out failed. Please try again.");
  // Share only a notification; session tokens stay in the authentication cookies.
  try { storage.setItem(SIGN_OUT_EVENT, crypto.randomUUID()); } catch { /* Storage can be disabled. */ }
  navigate();
}

export function watchBrowserSession(browser: Window) {
  function lastSignOut() {
    try { return browser.localStorage.getItem(SIGN_OUT_EVENT); } catch { return null; }
  }
  const initialSignOut = lastSignOut();
  let leaving = false;
  function leave() {
    if (leaving) return;
    leaving = true;
    browser.location.replace("/login");
  }
  function onStorage(event: StorageEvent) {
    if (event.key === SIGN_OUT_EVENT && event.newValue && event.newValue !== initialSignOut) leave();
  }
  function onFocus() {
    const latest = lastSignOut();
    if (latest && latest !== initialSignOut) leave();
  }
  function onPageShow(event: PageTransitionEvent) {
    // Restored history pages must verify their cookies again before showing a workspace.
    if (event.persisted && !leaving) browser.location.reload();
  }
  browser.addEventListener("storage", onStorage);
  browser.addEventListener("focus", onFocus);
  browser.addEventListener("pageshow", onPageShow);
  return () => {
    browser.removeEventListener("storage", onStorage);
    browser.removeEventListener("focus", onFocus);
    browser.removeEventListener("pageshow", onPageShow);
  };
}
