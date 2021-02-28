import '../styles/global.css'
import { ChallengesProvider } from '../contexts/ChallangesContext'

function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
    )
}

export default MyApp
