import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import styles from '../styles/components/ExperienceBar.module.css'


export function ExperienceBar(){

    const {currentExperience, experienceToNextLevel} =  useContext( ChallengesContext )

    const percentToNextLevel = Math.round( currentExperience * 100 ) / experienceToNextLevel

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <span 
                    style={{left: `${percentToNextLevel}%`}} 
                    className={styles.currentExperience}>
                    <img src="/icons/exp-up.svg" alt="Current experience"/>
                    {currentExperience} xp
                </span>
                <div style={{width: `${percentToNextLevel}%`}} />                
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}