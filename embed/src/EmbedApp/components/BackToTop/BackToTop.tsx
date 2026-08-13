import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./BackToTop.module.scss";

const ChevronUpIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m8 17 6-6 6 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BackToTop = () => {
  const sentinel = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "50% 0px 0px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinel}
        className={styles["back-to-top-sentinel"]}
        aria-hidden="true"
      />
      <button
        onClick={() =>
          sentinel.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        className={clsx(
          styles["back-to-top-btn"],
          visible && styles["back-to-top-btn-visible"],
        )}
        tabIndex={visible ? 0 : -1}
        type="button"
      >
        <ChevronUpIcon />
      </button>
    </>
  );
};

export { BackToTop };
