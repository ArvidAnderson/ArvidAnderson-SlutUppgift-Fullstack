import DemoApi from "../components/demoapi";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div>

      {/*Hero Section */}
      <section className="HeroSection">
        <Hero
        title={"Fullstack"}
        description={"this small fullstack web application is created with NextJS + ASP.NET Core."}
        buttonTitle={"Try it out!"}
        />
      </section>

      {/* Demo api section */}
      <section className="DemoApiSection">
        <DemoApi/>
      </section>
    </div>
  )
}
