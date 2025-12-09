import React from "react";
import {
  FiCamera,
  FiRefreshCw,
  FiUsers,
  FiThumbsUp,
  FiClock,
  FiShield,
  FiSmartphone,
  FiFlag,
} from "react-icons/fi";
import Heading from "../Shared/Heading";

/**
 * CivicFix Features Component
 * React 19 + Tailwind CSS
 *
 * Usage:
 * import Features from "./components/Features";
 * <Features />
 *
 * Make sure react-icons is installed and Tailwind is configured.
 */

const features = [
  {
    id: 1,
    title: "Issue Reporting with Image & Location",
    desc: "Report problems with photos, description, and exact map location in one go.",
    Icon: FiCamera,
  },
  {
    id: 2,
    title: "Real-Time Issue Tracking",
    desc: "Follow each issue’s live status from Pending to Resolved with updates.",
    Icon: FiRefreshCw,
  },
  {
    id: 3,
    title: "Role-Based Dashboards",
    desc: "Separate dashboards for Citizens, Staff, and Admin for clear responsibilities.",
    Icon: FiUsers,
  },
  {
    id: 4,
    title: "Smart Priority & Boost",
    desc: "Boost critical issues (paid) to increase visibility and speed up response.",
    Icon: FiFlag,
  },
  {
    id: 5,
    title: "Community Upvotes",
    desc: "Citizens can upvote issues so public importance becomes visible to authorities.",
    Icon: FiThumbsUp,
  },
  {
    id: 6,
    title: "Timeline & Activity History",
    desc: "Every action creates an immutable timeline entry for transparency and audit.",
    Icon: FiClock,
  },
  {
    id: 7,
    title: "Secure & Verified",
    desc: "Firebase authentication and role-based access control keep the system secure.",
    Icon: FiShield,
  },
  {
    id: 8,
    title: "Responsive & User-Friendly",
    desc: "Mobile-first, accessible UI so citizens can report issues on any device.",
    Icon: FiSmartphone,
  },
];

export default function Features() {
  return (
    <section className=" bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Heading
          title={"Why Choose CivicFix?"}
          subtitle={
            "A transparent, citizen-first platform to report, track, and resolve public infrastructure issues."
          }
          center="true"
        />
        

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.Icon;
            return (
              <article
                key={f.id}
                className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 
             flex flex-col h-full"
                aria-labelledby={`feature-${f.id}-title`}
              >
                {/* TOP CONTENT */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#0B5ED7", color: "#fff" }}
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title + description */}
                  <div className="min-w-0">
                    <h3
                      id={`feature-${f.id}-title`}
                      className="text-lg font-medium text-gray-900"
                    >
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>

                {/* BOTTOM FIXED SECTION */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    {f.id <= 4 ? "Core" : "Support"}
                  </span>

                  <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                    Learn more →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
