import Card from "./Card";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";

const LatestIssues = () => {
  return (
    <Container>

      <Heading 
      title={"Latest Resolve Issue"}
      subtitle="This is subtitle"
      center="true"
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        
      </div>
    </Container>
  );
};

export default LatestIssues;
