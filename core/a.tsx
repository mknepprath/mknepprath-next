interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const A = (props: Readonly<Props>): React.ReactElement => (
  <a
    className={props.className}
    href={props.href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {props.children}
  </a>
);

export default A;
