import { useContext,useEffect,useState } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallangerBox.module.css'

export function ChallangerBox(){
    const { activeChallenge, displayMobile, resetChallange, completeChallange } = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded(){
        completeChallange()
        resetCountdown()
    }

    function handleChallengeFailed(){
        resetChallange()
        resetCountdown()
    }
    
    return(
        <div className={ `${styles.challangerBoxContainer} ${displayMobile}` }>
            { activeChallenge ?(
                <div className={styles.challangeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type="button"
                            className={styles.challangeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challangeSuccededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            completei
                        </button>
                    </footer>
                </div>
                ):(
                <div className={styles.challangerNotActive}>
                    <strong>Finalize um ciclo para receber desafios a serem completados</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando os desafios
                    </p>
                </div>
                )
            }
        </div>
    )
}

