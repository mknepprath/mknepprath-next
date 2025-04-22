import styles from "./shot.module.css";

interface Props {
  description: string;
  href: string;
  imgSrc?: string;
  title: string;
}

export default function Shot({ description, href, imgSrc, title }: Props) {
  return (
    <a
      className={styles.card}
      href={href}
      key={title}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img alt={title} className={styles.img} src={imgSrc} />
      <div className={styles.body}>
        <h3>
          {title} <span className={styles.arrow}>&rarr;</span>
        </h3>
        <p>{description}</p>
      </div>
    </a>
  );
}
