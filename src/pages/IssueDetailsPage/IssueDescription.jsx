import { useState } from "react";

export default function IssueDescription({ description }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="mt-4">
      <p
        className={`text-gray-600 leading-relaxed text-sm md:text-base transition-all ${
          expanded
            ? ""
            : "line-clamp-3 md:line-clamp-4 lg:line-clamp-5"
        }`}
      >
        {description}
      </p>

      {description.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-primary text-sm font-medium hover:underline cursor-pointer"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
