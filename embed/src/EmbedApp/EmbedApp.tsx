import { useCallback, useState } from "react";
import { isRtlLocale } from "@src/utils/rtl";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Template } from "./components/Template";
import { TemplateWindow } from "./components/TemplateWindow";
import { usePanelState } from "./usePanelState";
import type { IEmbedApp, TTemplate } from "./EmbedApp.types";
import styles from "./EmbedApp.module.scss";

/*
 * Two components the previous embed rendered are gone from the redesign:
 *
 * - BackToTop: the panel is now a fixed-height, internally scrolling layout,
 *   so the document never scrolls and a fixed scroll-to-top button has nothing
 *   to act on. The list column carries its own scrollbar instead.
 * - The floating topbar: at `inset-inline-end: 24px` it sat directly on top of
 *   the list column's Search button. The language switcher moved into the
 *   filter panel's header row, which the mockups leave empty to the right of
 *   the "Templates" title.
 */
const EmbedApp = ({ locale, data, onLocaleChange, onEdit }: IEmbedApp) => {
  const state = usePanelState(data);
  const [selected, setSelected] = useState<TTemplate | null>(null);

  const open = useCallback((template: TTemplate) => setSelected(template), []);

  const edit = useCallback(
    (template: TTemplate) => {
      // Opening is what makes a template "recent"; previewing it is not enough.
      state.markOpened(template.url);
      setSelected(null);
      onEdit(template);
    },
    [state, onEdit],
  );

  return (
    <div
      className={styles.embed}
      lang={locale}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
    >
      <Template
        state={state}
        onOpen={open}
        headerAction={
          <LanguageSwitcher current={locale} onChange={onLocaleChange} />
        }
      />

      <TemplateWindow
        selected={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onEdit={edit}
        isFavorite={!!selected && state.favorites.has(selected.url)}
        onToggleFavorite={state.toggleFavorite}
      />
    </div>
  );
};

export { EmbedApp };
