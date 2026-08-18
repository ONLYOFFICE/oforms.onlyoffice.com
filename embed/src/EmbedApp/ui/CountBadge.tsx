import styles from "./CountBadge.module.scss";

interface ICountBadge {
  count: number;
}

/** Figma `.mini` -- 16x16 accent circle with the active-filter count. */
const CountBadge = ({ count }: ICountBadge) =>
  count > 0 ? <span className={styles["count-badge"]}>{count}</span> : null;

export { CountBadge };
