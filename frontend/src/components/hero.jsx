import { useRouter } from "next/router"

export default function Hero({ title, description, buttonTitle, buttonLink }) {

  const router = useRouter()

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6 text-2xl">{description}</p>
          <button onClick={() => router.push(buttonLink)} className="btn btn-primary">{buttonTitle}</button>
        </div>
      </div>
    </div>
  )
}
