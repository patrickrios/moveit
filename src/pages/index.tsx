import  {GetServerSideProps} from 'next'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallanger } from '../components/CompletedChallanger'
import { Countdown } from '../components/Countdown'
import { Footer }  from '../components/Footer'

import Head from 'next/head'

import styles from '../styles/components/Home.module.css'
import { ChallangerBox } from '../components/ChallangerBox'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallangesContext'

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home( props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}  
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>

        <Head >
          <title>Inicio | moveit</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallanger />
              <Countdown />
            </div>

            <div>
              <ChallangerBox />
            </div>
          </section>
        </CountdownProvider>
        <Footer />
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps  = async ( ctx ) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}