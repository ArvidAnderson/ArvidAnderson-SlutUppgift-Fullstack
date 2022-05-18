import Navbar from "./navbar"
export default function Layout({ children }) {
  return (
    <>
      <Navbar title={process.env.NEXT_PUBLIC_APP_NAME}/>
      <main>{children}</main>
    </>
  )
}
