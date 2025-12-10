import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCity, FaHandsHelping, FaShieldAlt } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";

const features = [
  {
    id: 1,
    icon: <FaCity />,
    title: "Smart Civic Platform",
    desc: "CivicFix connects citizens with authorities to report and resolve local issues efficiently.",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "Community Driven",
    desc: "Powered by people. Every report helps improve neighborhoods and cities.",
  },
  {
    id: 3,
    icon: <FaHandsHelping />,
    title: "Transparent Process",
    desc: "Track issue progress from submission to resolution with full visibility.",
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    title: "Trusted & Secure",
    desc: "Your data is protected while making civic participation simple and safe.",
  },
];

export default function AboutUs() {
  return (
    <Container>
      <title>CivicFix | About Us</title>

      {/* SECTION TITLE */}

      <Heading
        title="About CivicFix"
        subtitle={
          "CivicFix is built to empower citizens, improve transparency, and help  communities work together to solve real-world civic problems."
        }
        center="true"
      />

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            Who We Are
          </span>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mt-3">
            Building Better Cities <br className="hidden sm:block" />
            <span className="text-blue-600">Together</span>
          </h3>

          <p className="mt-5 text-gray-600 max-w-xl">
            CivicFix is a digital civic engagement platform where citizens can
            report issues like road damage, garbage problems, water shortages,
            and track their resolution in a transparent way.
          </p>

          <p className="mt-4 text-gray-500 max-w-xl">
            Our goal is to strengthen communication between people and local
            authorities, creating safer, cleaner, and smarter cities.
          </p>
        </motion.div>

        {/* RIGHT CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 text-xl mb-4">
                {item.icon}
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}
