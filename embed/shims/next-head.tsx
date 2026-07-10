/** No-op `next/head` — the desktop tab manages its own document head. */
import type { ReactNode } from "react";

const Head = ({ children: _children }: { children?: ReactNode }) => null;

export default Head;
