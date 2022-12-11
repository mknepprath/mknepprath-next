import Hero from "@core/hero";
import Layer from "@core/layer";
import useScrollPosition from "@hooks/useScrollPosition";

import layerStyles from "./layer.module.css";
import styles from "./parallax.module.css";

export default function Parallax(): JSX.Element {
  const scrollPosition = useScrollPosition();

  return (
    <div className={styles.keyart} id="parallax">
      <Layer id="0" position={scrollPosition} speed={0.02} />
      <Layer id="1" position={scrollPosition} speed={0.11} />
      <Layer id="2" position={scrollPosition} speed={0.26} />
      <Layer id="3b" position={scrollPosition} speed={0.39} />
      <Layer id="3" position={scrollPosition} speed={0.49} />
      <Layer id="7" position={scrollPosition} speed={0.49}>
        <Hero className={styles.hero} />
      </Layer>
      <Layer id="4" position={scrollPosition} speed={0.69} />
      <Layer id="5" position={scrollPosition} speed={0.79} />
      <div className={layerStyles.keyartLayer} id="keyart-6" />
    </div>
  );
}
