interface Props {
  children?: JSX.Element;
  id: string;
  position: number;
  speed: number;
}

export default function Layer({
  children,
  id,
  position,
  speed,
}: Props): JSX.Element {
  return (
    <div
      className="keyart_layer parallax"
      id={`keyart-${id}`}
      key={`keyart-${id}`}
      style={{
        transform: `translate3d(0px, ${position * -speed}px, 0px)`,
      }}
    >
      {children}
    </div>
  );
}
