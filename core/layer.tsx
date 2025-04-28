import classnames from "classnames";

import styles from "./layer.module.css";

interface Props {
  children?: React.ReactElement;
  id: string;
  position: number;
  speed: number;
}

export default function Layer({ children, id, position, speed }: Props) {
  return (
    <div
      className={classnames(styles.keyartLayer, styles.parallax)}
      id={`keyart-${id}`}
      style={{
        transform: `translate3d(0px, ${position * -speed}px, 0px)`,
      }}
    >
      {children}
    </div>
  );
}
