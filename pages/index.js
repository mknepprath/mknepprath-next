import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Footer from '../components/footer'

import { projectLinks } from '../utils/links'

import styles from './index.css'

export default () => (
  <div>
    <Head title="Michael Knepprath, Developer &amp; Designer" />
    <Nav />

    <div className={styles.hero}>
      <h1 className={styles.title}>
        <span>Hello!</span><br />
        I design & develop things for the internet.
      </h1>
    </div>

    <div className={styles.row}>
      {projectLinks.map(link => (
        <Link href={link.href} key={link.label}>
          <a
            className={styles.card}
            rel='noopener'
            target='_blank'
          >
            {link.url
              ? (
                <img
                  alt={link.label}
                  className={styles.img}
                  src={link.url}
                />
              )
              : null
            }
            <div>
              <h3>{link.label} <span className={styles.arrow}>&rarr;</span></h3>
              <p>{link.description}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>

    <Footer />
  </div>
)
