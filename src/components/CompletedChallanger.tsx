import styles from '../styles/components/CompletedChallanger.module.css'

export function CompletedChallanger(){
    return(
        <div className={styles.completedChallangerContainer}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    )
}