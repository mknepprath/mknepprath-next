import React, { forwardRef } from "react";
import classnames from "classnames";

import styles from "./layer.module.css";

interface Props {
  children?: React.JSX.Element;
  id: string;
}

const Layer = forwardRef<HTMLDivElement, Props>(function Layer(
  { children, id },
  ref,
) {
  return (
    <div
      className={classnames(styles.keyartLayer, styles.parallax)}
      id={`keyart-${id}`}
      ref={ref}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
});

export default Layer;
