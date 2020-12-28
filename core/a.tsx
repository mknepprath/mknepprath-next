interface Props {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
  href: string;
}

export default function A(props: Props): JSX.Element {
  return (
    <a
      className={props.className}
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
}
