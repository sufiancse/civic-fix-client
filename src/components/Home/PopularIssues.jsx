// PopularIssues.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaRoad, FaBolt, FaWater, FaTrash, FaLightbulb } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Heading from "../Shared/Heading";
import Container from "../Shared/Container";

// Dummy Data
const categories = [
  {
    id: 1,
    name: "Road Issues",
    icon: <FaRoad size={28} />,
    desc: "Road repair issues",
  },
  {
    id: 2,
    name: "Electricity",
    icon: <FaBolt size={28} />,
    desc: "Bijli shut down & wiring problems",
  },
  {
    id: 3,
    name: "Water Supply",
    icon: <FaWater size={28} />,
    desc: "Pipe leak & water shortage issues",
  },
  {
    id: 4,
    name: "Garbage",
    icon: <FaTrash size={28} />,
    desc: "Waste disposal & cleaning issues",
  },
  {
    id: 5,
    name: "Streetlights",
    icon: <FaLightbulb size={28} />,
    desc: "Non-working street lights",
  },
];

// Framer Motion variants for stagger animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};



export default function PopularIssues() {
  return (
    <Container className="">
      {/* Title + Description */}
      <Heading
        title="Popular Issues"
        subtitle="Discover the most reported issues in your area and quickly take action
          by reporting problems that matter to you."
          center="true"
      />
      
      {/* Carousel */}
      <motion.div
        
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          freeModeMomentum={false}
          speed={6000} // adjust for slower/faster movement
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id} className="w-[90%] sm:w-[45%] md:w-[33%] lg:w-[25%]">
              <motion.div
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center cursor-pointer hover:bg-blue-50 transition-all perspective-1000"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-blue-500 mb-4">{cat.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition">
                  Report Issue
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Container>
  );
}
