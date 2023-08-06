import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FindActivityBox from '../components/FindActivityBox'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

export const STRAVA_REDIRECT_URI = "http://localhost:3000/api/auth/callback"

const Home: NextPage = () => {

  const { data: session } = useSession()

  // const handleAuthenticate = async () => {
  //   //redirect to strava auth page
  //   const redirectURL = `https://www.strava.com/oauth/authorize?client_id=111699&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=force&scope=read`
  //   window.location.href = redirectURL
  //   // const response = await fetch('/api/authenticateStrava')
  //   // const data = await response.json()
  //   // console.log('data', data)
  //   // setAuthStatus(data.authenticated)
  // }

  if(session){
    return(
      <div className={styles.container}>
        <h1>Welcome to Strava Stories</h1>
        <FindActivityBox />
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
