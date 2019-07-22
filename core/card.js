import styles from "./card.css";

export default ({ description, href, imgSrc, title }) => (
  <a
    className={styles.card}
    href={href}
    key={title}
    rel={"noopener"}
    target={"_blank"}
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
