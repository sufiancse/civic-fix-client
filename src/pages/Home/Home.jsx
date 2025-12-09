import LatestResolvedIssues from "../../components/Home/LatestResolvedIssues";
import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";
import HowItWorks from "../../components/Home/HowItWorks";
import PopularIssues from "../../components/Home/PopularIssues";
import CommunityFeedback from "../../components/Home/CommunityFeedback";
import FeedbackForm from "../../components/Home/FeedbackForm";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestResolvedIssues />
      <Features />
      <HowItWorks />
      <PopularIssues />
      <CommunityFeedback />
      <FeedbackForm />
    </div>
  );
};

export default Home;
