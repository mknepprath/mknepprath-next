import React from 'react'
import Link from 'next/link'

import { footerLinks } from '../utils/links'

import styles  from './footer.css'

const Footer = () => (
  <nav className={styles.footer}>
    <p className={styles.siteLogo}>
      Created by Michael Knepprath •
      <Link href='https://github.com/mknepprath/mknepprath-next'>
        <a>GitHub</a>
      </Link>
    </p>
    <ul>
      {footerLinks.map(({ href, key, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Footer
