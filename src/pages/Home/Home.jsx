import LatestIssues from "../../components/Home/LatestIssues";
import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";
import HowItWorks from "../../components/Home/HowItWorks";
import PopularIssues from "../../components/Home/PopularIssues";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestIssues />
      <Features />
      <HowItWorks />
      <PopularIssues />
    </div>
  );
};

export default Home;
