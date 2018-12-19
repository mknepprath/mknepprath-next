import React from 'react'
import Link from 'next/link'

import { navLinks } from '../utils/links'

import styles  from './nav.css'

const Nav = () => (
  <nav className={styles.nav}>
    <a className={styles.siteLogo} href='/'>
      <img
        className={styles.img}
        src='/static/memoji.png'
      />
      <span>M. Knepprath</span>
    </a>
    <ul>
      {navLinks.map(({ href, key, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
