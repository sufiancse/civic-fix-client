import LatestIssues from "../../components/Home/LatestIssues";
import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";
import HowItWorks from "../../components/Home/HowItWorks";
import PopularIssues from "../../components/Home/PopularIssues";
import CommunityFeedback from "../../components/Home/CommunityFeedback";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestIssues />
      <Features />
      <HowItWorks />
      <PopularIssues />
      <CommunityFeedback />
    </div>
  );
};

export default Home;
