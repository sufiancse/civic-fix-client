import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Card from "../Shared/Card/Card";
import { Button } from "@headlessui/react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const LatestResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();

  const { data: resolvedIssues = [], isLoading } = useQuery({
    queryKey: ["latestResolvedIssues"],
    queryFn: async () => {
      const res = await axiosSecure("/api/latest-resolved-issues");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Heading
        title={"Latest Resolve Issues"}
        subtitle="Check out the most recent issues successfully resolved by our community. Stay updated and see how quickly problems are getting fixed."
        center="true"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-5">
        {resolvedIssues.map((issue) => (
          <Card key={issue._id} issue={issue} />
        ))}
      </div>
      <div className="text-end mt-10">
        <Link
          to="/all-issues"
          className="inline-flex items-center gap-2 px-3 py-2 border border-primary rounded-md 
               text-primary hover:bg-primary hover:text-white transition"
        >
          <span>View All Issues</span>
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </Container>
  );
};

export default LatestResolvedIssues;
