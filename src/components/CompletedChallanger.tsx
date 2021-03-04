import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import styles from '../styles/components/CompletedChallanger.module.css'

export function CompletedChallanger(){

    const {challengesCompleted } = useContext(ChallengesContext)
    return(
        <div className={styles.completedChallangerContainer}>
            <span>Desafios completos</span>
            <span>{String(challengesCompleted)}</span>
        </div>
    )
}