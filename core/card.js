import styles from "./card.css";

export default ({ description, href, imgSrc, label }) => (
  <a
    className={styles.card}
    href={href}
    key={label}
    rel={"noopener"}
    target={"_blank"}
  >
    {imgSrc ? <img alt={label} className={styles.img} src={imgSrc} /> : null}
    <div>
      <h3>
        {label} <span className={styles.arrow}>&rarr;</span>
      </h3>
      <p>{description}</p>
    </div>
  </a>
);
