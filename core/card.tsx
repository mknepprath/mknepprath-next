import styles from "./card.module.css";

interface Props {
  description: string;
  href: string;
  imgSrc?: string;
  title: string;
}

export default function Card({
  description,
  href,
  imgSrc,
  title,
}: Props): JSX.Element {
  return (
    <a
      className={styles.card}
      href={href}
      key={title}
      rel="noopener noreferrer"
      target="_blank"
    >
      {imgSrc ? <img alt={title} className={styles.img} src={imgSrc} /> : null}
      <div>
        <h3>
          {title} <span className={styles.arrow}>&rarr;</span>
        </h3>
        <p>{description}</p>
      </div>
    </a>
  );
}
