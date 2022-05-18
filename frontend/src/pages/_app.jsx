import "../styles/tailwind.css"
import Navbar from "../components/navbar"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar title={process.env.NEXT_PUBLIC_APP_NAME}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
