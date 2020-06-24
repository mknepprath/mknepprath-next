import React from "react";

const BRUSH_LENGTH = 320;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

interface Props {
  colors?: Array<string>;
  coordinates: Array<number>;
  increment: number;
  length?: number;
  style?: React.CSSProperties;
}

export default function PxBrushPage(props: Props) {
  const [x, y] = props.coordinates;

  const colors = props.colors || [
    "rgba(120, 159, 177, .4)",
    "rgba(99, 91, 137, .4)",
    "rgba(226, 135, 164, .4)",
    "rgba(255, 207, 186, .4)",
    "rgba(51, 51, 51, 1)",
  ];

  const length = props.length || BRUSH_LENGTH;

  const [nodes, setNodes] = React.useState([
    { color: colors[0], id: `${x},${y}`, x, y },
  ]);

  React.useEffect(() => {
    let id = setInterval(() => {
      setNodes((prevNodes) => {
        let nextX =
          prevNodes[prevNodes.length - 1].x +
          [-props.increment, 0, props.increment][getRandomInt(3)];
        let nextY =
          prevNodes[prevNodes.length - 1].y +
          [-props.increment, 0, props.increment][getRandomInt(3)];
        const nextNodes = [
          ...prevNodes,
          {
            color: colors[getRandomInt(colors.length)],
            id: `${nextX},${nextY}`,
            x: nextX < 0 ? 0 : nextX,
            y: nextY < 0 ? 0 : nextY,
          },
        ];
        if (nextNodes.length > length) nextNodes.shift();
        return nextNodes;
      });
    }, 1);
    return () => clearInterval(id);
  });

  return (
    <>
      {nodes.map(({ x, y, color }, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
            height: props.increment,
            left: x,
            pointerEvents: "none",
            position: "absolute",
            width: props.increment,
            top: y,
            ...props.style,
          }}
        />
      ))}
    </>
  );
}
