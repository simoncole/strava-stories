import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FindActivityBox from '../components/FindActivityBox'
import { useState } from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'

export const STRAVA_REDIRECT_URI = "http://localhost:3000/api/auth/callback"

const Home: NextPage = () => {

  const { data: session } = useSession()

  if(session){
    //@ts-ignore
    console.log('session', session.accessToken)
    return(
      <div className={styles.container}>
        <h1>Welcome to Strava Stories</h1>
        <FindActivityBox name={session.user?.name} />
        <button onClick={() => signOut()} >Sign Out</button>
      </div>
    )
  }
  else {
    return(
      <div className={styles.container}>
        <h1>Welcome to Strava Stories</h1>
        <button onClick={() => signIn('strava')}>Authenticate with Strava </button>
      </div>
    )
  }
}

export default Home
