import { motion } from "framer-motion";
import {
  HiOutlineExclamationCircle,
  HiOutlineOfficeBuilding,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import Heading from "../Shared/Heading";

const steps = [
  {
    id: 1,
    title: "Report an Issue",
    desc: "Citizens report local problems with details, photos, and location.",
    icon: HiOutlineExclamationCircle,
  },
  {
    id: 2,
    title: "Authority Review",
    desc: "Concerned government departments review and verify the report.",
    icon: HiOutlineOfficeBuilding,
  },
  {
    id: 3,
    title: "Track Progress",
    desc: "Users track real-time status updates from their dashboard.",
    icon: HiOutlineClock,
  },
  {
    id: 4,
    title: "Issue Resolved",
    desc: "Once fixed, users are notified and the issue is marked complete.",
    icon: HiOutlineCheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section>
      {/* Header */}
      <Heading
       
        title="How CivicFix Works"
        subtitle=" A simple, transparent process that connects citizens with authorities."
        center="true"
      />
      

      {/* Steps */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-xl p-6 shadow-sm border
                         border-gray-200 hover:shadow-md transition-all"
            >
              {/* Accent line */}
              <span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-xl" />

              {/* Step number */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full
                                bg-primary/10 text-primary font-semibold"
                >
                  {step.id < 10 ? `0${step.id}` : step.id}
                </div>

                <Icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-medium text-gray-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
