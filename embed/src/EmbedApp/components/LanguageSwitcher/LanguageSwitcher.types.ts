import { type Locale } from "../../../locale";

export interface ILanguageSwitcher {
  current: Locale;
  onChange: (shortKey: string) => void;
}
