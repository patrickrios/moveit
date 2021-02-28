import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallanger } from '../components/CompletedChallanger'
import { Countdown } from '../components/Countdown'

import Head from 'next/head'

import styles from '../styles/components/Home.module.css'
import { ChallangerBox } from '../components/ChallangerBox'
import { CountdownProvider } from '../contexts/CountdownContext'

export default function Home() {
  return (
    <div className={styles.container}>

      <Head >
        <title>Inicio | moveit</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div className="">
            <Profile />
            <CompletedChallanger />
            <Countdown />
          </div>

          <div>
            <ChallangerBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
