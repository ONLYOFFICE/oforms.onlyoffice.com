import { useMemo, useState, type MouseEvent } from "react";
import { RouterProvider } from "../shims/next-router";
import { MainTemplate } from "@src/components/templates/Main";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TemplateModal, type Template } from "./TemplateModal";
import type { Locale } from "./locale";
import styles from "./EmbedApp.module.scss";

interface Props {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onLocaleChange: (shortKey: string) => void;
  onEdit: (template: Template) => void;
  editLabel: string;
}

const normalizeUrl = (u: string) => (u?.startsWith("/") ? u : `/${u}`);

export function EmbedApp({ locale, data, onLocaleChange, onEdit, editLabel }: Props) {
  const [selected, setSelected] = useState<Template | null>(null);

  // Map template path -> template, to recognise card clicks.
  const byPath = useMemo(() => {
    const map = new Map<string, Template>();
    for (const t of data?.data ?? []) {
      if (t?.url) map.set(normalizeUrl(String(t.url)), t);
    }
    return map;
  }, [data]);

  // Intercept clicks on template links: open the info modal instead of leaving.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    let path = href;
    try {
      path = new URL(href, window.location.href).pathname;
    } catch {
      /* keep raw */
    }
    const template = byPath.get(path);
    if (template) {
      e.preventDefault();
      e.stopPropagation();
      setSelected(template);
    }
  };

  return (
    <RouterProvider locale={locale}>
      <div className={styles.embed} onClickCapture={onClickCapture}>
        <div className={styles.topbar}>
          <LanguageSwitcher current={locale} onChange={onLocaleChange} />
        </div>
        <MainTemplate allForms={data} />
        {selected && (
          <TemplateModal
            template={selected}
            editLabel={editLabel}
            onEdit={onEdit}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </RouterProvider>
  );
}
