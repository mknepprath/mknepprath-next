import React, { useEffect } from "react";

import Head from "core/head";
import PxBrush from "core/pxbrush";

const INC = 2;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

export default function PxBrushPage() {
  const [brushes, setBrushes] = React.useState<Array<Array<number>>>([]);
  const [scale, setScale] = React.useState<number>();
  const [quantity, setQuantity] = React.useState<number>();

  useEffect(() => {
    const { innerHeight, innerWidth, location } = window;

    const urlParams = new URLSearchParams(location.search);
    const scale = urlParams.get("scale") || INC;
    const quantity = urlParams.get("quantity") || 1;

    for (let i = 0; i < quantity; i++) {
      const x = getRandomInt(innerWidth);
      const y = getRandomInt(innerHeight);
      setBrushes((prevBrushes) => [
        ...prevBrushes,
        [x - (x % +scale), y - (y % +scale)],
      ]);
    }

    setScale(+scale);
    setQuantity(+quantity);
  }, []);

  if (!scale || !quantity) return null;

  return (
    <>
      <Head title="Pixel Brush">
        <style>{`body { background-color: #${randomColor()}; }`}</style>
      </Head>
      {brushes.map((coordinates, key) => (
        <PxBrush coordinates={coordinates} key={key} increment={scale} />
      ))}
    </>
  );
}
