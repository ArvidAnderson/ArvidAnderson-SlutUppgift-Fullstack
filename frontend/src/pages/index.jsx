import Hero from "../components/hero";

export default function Home() {
  return (
    <div>
      <Hero
       title={"Fullstack"}
       description={"this small fullstack web application is created with NextJS + ASP.NET Core."}
       buttonTitle={"Try it out!"}
      />
    </div>
  )
}
