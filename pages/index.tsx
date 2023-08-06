import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FindActivityBox from '../components/findActivityBox'

const Home: NextPage = () => {
  const [authStatus, setAuthStatus] = useState<boolean>(false)


  const handleAuthenticate = async () => {
    //redirect to strava auth page
    window.location.href = '/api/authenticateStrava'
    // const response = await fetch('/api/authenticateStrava')
    // const data = await response.json()
    // console.log('data', data)
    // setAuthStatus(data.authenticated)
  }
  return (
    <div className={styles.container}>
      <h1>Welcome to Strava Stories</h1>
      {
        authStatus ?
        <FindActivityBox /> :
        <button onClick={handleAuthenticate}>Authenticate with Strava </button>
      }
    </div>
  )
}

export default Home
