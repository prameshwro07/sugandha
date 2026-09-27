"use client";

export type MetaPixelContent = {
  id: string;
  quantity: number;
  item_price: number;
};

export type MetaPixelParameters = Record<
  string,
  string | number | string[] | MetaPixelContent[]
>;

const activeCheckoutKey = "sugandha:meta:active-checkout";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void };
    _fbq?: Window["fbq"];
    __metaPending?: Array<{ event: string; parameters?: MetaPixelParameters; id?: string }>;
  }
}

export function trackMetaEvent(event: string, parameters?: MetaPixelParameters) {
  if (typeof window === "undefined") return;
  if (!window.fbq) {
    (window.__metaPending ??= []).push({ event, parameters });
    return;
  }
  window.fbq("track", event, parameters);
}

export function flushMetaEvents() {
  if (typeof window === "undefined" || !window.fbq) return;
  for (const queued of window.__metaPending ?? []) {
    window.fbq("track", queued.event, queued.parameters, ...(queued.id ? [{ eventID: queued.id }] : []));
  }
  window.__metaPending = [];
}

export function trackMetaEventOnce(event: string, id: string, parameters?: MetaPixelParameters) {
  if (typeof window === "undefined" || !id) return;
  const key = `sugandha:meta:${event}:${id}`;
  try {
    if (window.localStorage.getItem(key)) return;
    window.localStorage.setItem(key, "1");
  } catch {
    // Do not send a purchase if durable deduplication cannot be guaranteed.
    return;
  }
  if (window.fbq) window.fbq("track", event, parameters, { eventID: id });
  else (window.__metaPending ??= []).push({ event, parameters, id });
}

export function trackCheckoutOncePerVisit(parameters: MetaPixelParameters) {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(activeCheckoutKey)) return;
    window.sessionStorage.setItem(activeCheckoutKey, "1");
  } catch {
    // Suppress the event if per-tab deduplication cannot be guaranteed.
    return;
  }
  trackMetaEvent("InitiateCheckout", parameters);
}

export function resetCheckoutVisit() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(activeCheckoutKey);
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
}
