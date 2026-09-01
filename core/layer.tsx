import React, { forwardRef } from "react";
import classnames from "classnames";

import styles from "./layer.module.css";

interface Props {
  children?: React.JSX.Element;
  className?: string;
  id: string;
  onAnimationEnd?: () => void;
}

const Layer = forwardRef<HTMLDivElement, Props>(function Layer(
  { children, className, id, onAnimationEnd },
  ref,
) {
  return (
    <div
      className={classnames(styles.keyartLayer, styles.parallax, className)}
      id={`keyart-${id}`}
      onAnimationEnd={onAnimationEnd}
      ref={ref}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
});

export default Layer;
