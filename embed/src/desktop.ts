type Listener = (culture: string) => void;

const cultureKey = (culture: string): string =>
  culture.trim().toLowerCase().replace(/_/g, "-");

function readRendererLang(): string | null {
  try {
    const v = (window as any).RendererProcessVariable;
    const raw = v?.lang ?? v?.locale ?? v?.language;
    return typeof raw === "string" && raw.trim() ? raw.trim() : null;
  } catch {
    return null;
  }
}

function localeFromSettings(command: unknown, param: unknown): string | null {
  if (command !== "settings:init") return null;
  try {
    const data =
      typeof param === "string"
        ? JSON.parse(param)
        : (param as Record<string, unknown>);
    const raw = data?.locale;
    if (raw && typeof raw === "object")
      return (raw as any).current ? String((raw as any).current) : null;
    return raw ? String(raw) : null;
  } catch {
    return null;
  }
}

export function getDesktopLocale(): string | null {
  return readRendererLang();
}

export function watchDesktopLocale(onChange: Listener): void {
  let last: string | null = null;

  const emit = (culture: string | null | undefined) => {
    if (!culture) return;
    const key = cultureKey(culture);
    if (key === last) return;
    last = key;
    onChange(culture);
  };

  const handle = (command: unknown, param: unknown) => {
    emit(localeFromSettings(command, param));
  };

  try {
    const w = window as any;
    let next = w.on_native_message;
    const wrapper = function (this: unknown, command: unknown, param: unknown) {
      handle(command, param);
      if (typeof next === "function")
        return next.apply(this, arguments as unknown as [unknown, unknown]);
    };
    Object.defineProperty(w, "on_native_message", {
      configurable: true,
      get: () => wrapper,
      set: (fn: unknown) => {
        next = fn;
      },
    });
  } catch (e) {
    console.warn("[oforms-embed] could not install on_native_message", e);
    try {
      (window as any).on_native_message = handle;
    } catch {}
  }

  let subscribed = false;
  const subscribe = () => {
    if (subscribed) return;
    try {
      const ce = (window as any).CommonEvents;
      if (ce && typeof ce.on === "function") {
        subscribed = true;
        ce.on("lang:changed", (_old: unknown, culture: unknown) => {
          if (typeof culture === "string") emit(culture);
        });
      }
    } catch {}
  };
  subscribe();
  if (!subscribed) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", subscribe);
    if (document.readyState !== "complete")
      window.addEventListener("load", subscribe);
  }
}
