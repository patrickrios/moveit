import { useState, useEffect, useContext } from 'react'
import {ChallengesContext} from '../contexts/ChallangesContext'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown(){

    const { startNewChallanger } = useContext( ChallengesContext )

    const [time, setTime] = useState(0.1 * 40)
    const [isActive, setActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor( time / 60)
    const seconds = time % 60

    const [minLeft, minRight] = String(minutes).padStart(2,'0').split('')
    const [secLeft, secRight] = String(seconds).padStart(2,'0').split('')

    function startCountdown(){
        setActive(true)
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout)
        setActive(false)
        setTime(0.1*40)
    }

    useEffect( ()=>{
        if( isActive && time > 0){
            countdownTimeout = setTimeout( ()=>{
                setTime(time - 1)
            }, 1000)
        }else if( isActive && time === 0 ){
            setHasFinished(true)
            setActive(false)
            startNewChallanger()
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minLeft}</span>
                    <span>{minRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secLeft}</span>
                    <span>{secRight}</span>
                </div>
            </div>
            {
                hasFinished ? (
                    <button 
                        disabled
                        className={styles.startCountdown}
                    >
                        Ciclo encerrado
                    </button>
                ) : (
                    isActive ? 
                    (
                        <button 
                            onClick={resetCountdown} 
                            type="button" 
                            className={`${styles.startCountdown} ${styles.startCountdownActive}`}
                        >
                            Abandonar ciclo
                        </button>
                    ) :(
                        <button 
                            onClick={startCountdown} 
                            type="button" 
                            className={styles.startCountdown}
                        >
                            Iniciar ciclo
                        </button>
                    )
                )
            }
        </div>
    )
}