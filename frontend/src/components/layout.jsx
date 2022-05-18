import Navbar from "./navbar"
import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <>
      <Navbar title={process.env.NEXT_PUBLIC_APP_NAME}/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}
