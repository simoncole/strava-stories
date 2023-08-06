import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FindActivityBox from '../components/findActivityBox'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Strava Stories</h1>
      <FindActivityBox />
    </div>
  )
}

export default Home
