import classnames from "classnames";

import styles from "./hero.module.css";

interface Props {
  className?: string;
}

export default function Hero({ className }: Props): JSX.Element {
  return (
    <div className={classnames("container", styles.hero, className)}>
      <h1 className={styles.greeting}>
        <a
          href="https://youtu.be/5-CEGCXDVgI"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>Hello!</span>
        </a>
        <br />I design & develop things for the internet.
      </h1>
    </div>
  );
}
