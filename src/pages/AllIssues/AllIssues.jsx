import React from "react";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";

const AllIssues = () => {
  return (
    <Container>
      <title>CivicFix | All Issues</title>
      All Issues
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
              <Card />
              <Card />
            
            </div>
    </Container>
  );
};

export default AllIssues;
