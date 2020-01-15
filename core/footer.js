// External
import classnames from "classnames";
import PropTypes from "prop-types";

// Components
import TwitterIcon from "core/icon-twitter";

// Data
import { footerLinks } from "data/links";

import styles from "./footer.module.css";

function Footer({ className }) {
  return (
    <footer className={classnames(styles.footer, className)}>
      <span className={styles.footerMeta}>
        Created by Michael Knepprath •
        <a
          href="https://github.com/mknepprath/mknepprath-next"
          rel="noopener noreferrer"
          target="_blank"
        >
          View on GitHub
        </a>
      </span>
      <ul>
        <li>
          <a
            aria-label="Twitter"
            className={styles.twitter}
            href="https://twitter.com/mknepprath"
            title="The Bird Site"
          >
            <TwitterIcon />
          </a>
        </li>
        {footerLinks.map(({ href, key, title }) => (
          <li key={key}>
            <a
              href={href}
              rel="noopener noreferrer"
              target="_blank"
              title={title}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

Footer.defaultProps = {
  className: ""
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
