import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LANGUAGES } from "../../../locale";
import { ILanguageSwitcher } from "./LanguageSwitcher.types";
import styles from "./LanguageSwitcher.module.scss";

const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const LanguageSwitcher = ({ current, onChange }: ILanguageSwitcher) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const active = LANGUAGES.find((l) => l.shortKey === current);

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <GlobeIcon />
        <span className={styles.label}>{active?.longKey ?? current}</span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.shortKey}>
              <button
                type="button"
                role="option"
                aria-selected={l.shortKey === current}
                className={clsx(
                  styles.option,
                  l.shortKey === current && styles.active,
                )}
                onClick={() => {
                  onChange(l.shortKey);
                  setOpen(false);
                }}
              >
                {l.longKey}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { LanguageSwitcher };
