import Link from "next/link"

export default function Navbar({ title }) {
  return (
    <div className="navbar bg-primary absolute">
      <Link href={"/"}>
        <a className="btn btn-ghost normal-case text-xl focus:bg-primary-focus text-primary-content">{title}</a>
      </Link>
    </div>
  )
}
