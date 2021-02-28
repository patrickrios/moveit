import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import styles from '../styles/components/ChallangerBox.module.css'

export function ChallangerBox(){
    const { activeChallenge, resetChallange } = useContext(ChallengesContext)

    return(
        <div className={styles.challangerBoxContainer}>
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
                            onClick={resetChallange}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challangeSuccededButton}
                        >
                            completei
                        </button>
                    </footer>
                </div>
                ):(
                <div className="challangerNotActive">
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

