
import styles from '../styles/components/Footer.module.css'

export function Footer(){
    return(
        <footer className={styles.footer}>
            <img src="/icons/moveit-logo.svg" alt="Moveit Logo"/>
            <strong>by Patrick Rios</strong>
        </footer>
    )
}