import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){

    const { level } = useContext(ChallengesContext)
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/patrickrios.png" alt="Patrick Fernandes"/>
            <div>
                <strong>Patrick Fernandes</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}