import { ReactNode, createContext, useState, useEffect } from 'react'
import challanges from '../../challenges.json'

interface Chellange {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextDatas{
    level: number;
    currentExp: number;
    challengesCompleted: number; 
    activeChallenge: Chellange;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallanger: () => void;
    resetChallange: ()=> void;
    completeChallange: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextDatas)

export function ChallengesProvider( {children}: ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExp, setCurrentExp] = useState(0)
    const [challengesCompleted, setChallengesComplete] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    function levelUp(){
        setLevel( level+1 )
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
    }

    function resetChallange(){
        setActiveChallenge(null)
    }

    function completeChallange(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExp + amount

        if( finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExp(finalExperience)
        setActiveChallenge(null)
        setChallengesComplete( challengesCompleted + 1)
    }

    const experienceToNextLevel = Math.pow( (level+1)*4,2)

    useEffect( ()=>{
        Notification.requestPermission()
    },[])

    return(
        <ChallengesContext.Provider 
            value={{
                level,
                currentExp, 
                challengesCompleted, 
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallanger,
                resetChallange,
                completeChallange
            }
        }>
            {children}
        </ChallengesContext.Provider>
    )
}