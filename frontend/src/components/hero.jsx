import { useRouter } from "next/router"

export default function Hero({ title, description, buttonTitle, buttonLink }) {

  const router = useRouter()

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{title}</h1>
          <p class="py-6 text-2xl">{description}</p>
          <button onClick={() => router.push(buttonLink)} class="btn btn-primary">{buttonTitle}</button>
        </div>
      </div>
    </div>
  )
}
