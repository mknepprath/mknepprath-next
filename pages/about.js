import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import Footer from '../components/footer'

import styles from './about.css'

export default () => (
  <div>
    <Head title="About Michael Knepprath" />
    <Nav />

    <div className={styles.hero}>
      <img src='/static/about.jpg' />

      <h1>About</h1>
      <p>
        Michael Knepprath is a Software Engineer at WHCC. He loves the
        point at which technology and art converge: technology, design, film,
        video games, and so on.
      </p>

      <h3>Contact me</h3>
      <p>
        You can contact me via <a href='mailto:michael@mknepprath.com'>email</a> or
        send me a message on <a href='https://twitter.com/mknepprath'>Twitter</a>.
      </p>
    </div>

    <Footer />
  </div>
)
