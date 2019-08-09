import PropTypes from "prop-types";

import styles from "./card.css";

const Card = ({ description, href, imgSrc, title }) => (
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

Card.defaultProps = {
  href: ""
};

Card.propTypes = {
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Card;
