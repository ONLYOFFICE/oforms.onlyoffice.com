import styles from "./EmptyState.module.scss";

interface IEmptyState {
  title: string;
  text: string;
}

const EmptyState = ({ title, text }: IEmptyState) => (
  <div className={styles["empty-state"]}>
    <p className={styles["empty-state-title"]}>{title}</p>
    <p className={styles["empty-state-text"]}>{text}</p>
  </div>
);

export { EmptyState };
