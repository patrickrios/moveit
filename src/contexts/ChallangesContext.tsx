import { ReactNode, createContext, useState } from 'react'
import challanges from '../../challenges.json'

interface Challange {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextDatas{
    level: number;
    currentExp: number;
    challengesCompleted: number; 
    activeChallenge: Challange;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallanger: () => void;
    resetChallange: ()=> void;
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
    }

    function resetChallange(){
        setActiveChallenge(null)
    }

    const experienceToNextLevel = Math.pow( (level+1)*4,2)

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
                resetChallange
            }
        }>
            {children}
        </ChallengesContext.Provider>
    )
}