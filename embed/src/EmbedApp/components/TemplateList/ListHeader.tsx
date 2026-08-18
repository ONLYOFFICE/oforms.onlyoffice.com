import styles from "./ListHeader.module.scss";

interface IListHeader {
  title: string;
  /** Figma shows "2,275 results"; omitted in the Recents mockup. */
  count?: string;
}

const ListHeader = ({ title, count }: IListHeader) => (
  <div className={styles["list-header"]}>
    <h2 className={styles["list-header-title"]}>{title}</h2>
    {count && <span className={styles["list-header-count"]}>{count}</span>}
  </div>
);

export { ListHeader };
