import { ReactNode, createContext, useState, useEffect } from 'react'
import challanges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal'
import styles from '../styles/components/ChallangerBox.module.css'

interface Chellange {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextDatas{
    level: number;
    currentExperience: number;
    challengesCompleted: number; 
    activeChallenge: Chellange;
    experienceToNextLevel: number;
    displayMobile: string;
    levelUp: () => void;
    startNewChallanger: () => void;
    resetChallange: ()=> void;
    completeChallange: () => void;
    closeLevelModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextDatas)

export function ChallengesProvider( {
    children,
    ...rest
}: ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExp] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesComplete] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLeveModalOpen, setIsLevelModalOpen] = useState(false)

    const [displayMobile, setDisplayMobile] = useState(styles.challengeToggleMobile)

    function levelUp(){
        setLevel( level+1 )
        setIsLevelModalOpen(true)
    }

    function closeLevelModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallanger(){
        let randomChallengerId = Math.floor( Math.random() * challanges.length)
        let challenge = challanges[randomChallengerId]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `valendo ${challenge.amount} xp!`
            })
        }
        setDisplayMobile('')
    }

    function resetChallange(){
        setActiveChallenge(null)
        setDisplayMobile(styles.challengeToggleMobile)
    }

    function completeChallange(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount

        if( finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExp(finalExperience)
        setActiveChallenge(null)
        setChallengesComplete( challengesCompleted + 1)
        setDisplayMobile(styles.challengeToggleMobile)
    }

    const experienceToNextLevel = Math.pow( (level+1)*4,2)

    useEffect( ()=>{
        Notification.requestPermission()
    },[])

    useEffect( () => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted ])

    return(
        <ChallengesContext.Provider 
            value={{
                level,
                currentExperience, 
                challengesCompleted, 
                activeChallenge,
                experienceToNextLevel,
                displayMobile,
                levelUp,
                startNewChallanger,
                resetChallange,
                completeChallange,
                closeLevelModal
            }
        }>
        {children}
        { isLeveModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}