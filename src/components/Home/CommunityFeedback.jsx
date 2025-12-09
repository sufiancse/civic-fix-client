// CommunityFeedback.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";

const feedbacks = [
  {
    id: 1,
    name: "Rafiq Ahmed",
    location: "Dhaka, Bangladesh",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "Using CivicFix, I was able to report local issues quickly. Very convenient!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sadia Rahman",
    location: "Chittagong, Bangladesh",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "Issue tracking became really easy. The service is super smooth.",
    rating: 4,
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    location: "Khulna, Bangladesh",
    img: "https://randomuser.me/api/portraits/men/56.jpg",
    feedback:
      "I was amazed at how fast I could report problems using CivicFix. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    location: "Sylhet, Bangladesh",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      "Sharing my experience feels great. Seeing other community feedback is inspiring.",
    rating: 4,
  },
  {
    id: 5,
    name: "Imran Khalid",
    location: "Barisal, Bangladesh",
    img: "https://randomuser.me/api/portraits/men/70.jpg",
    feedback:
      "CivicFix made it so simple to track my issue. Truly helpful for everyone.",
    rating: 5,
  },
  {
    id: 6,
    name: "Farhana Akter",
    location: "Rajshahi, Bangladesh",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    feedback:
      "I love the user-friendly interface. Reporting problems is now hassle-free!",
    rating: 5,
  },
  {
    id: 7,
    name: "Shakib Al Hasan",
    location: "Dhaka, Bangladesh",
    img: "https://randomuser.me/api/portraits/men/88.jpg",
    feedback:
      "The platform is reliable and fast. Resolved my issues in no time.",
    rating: 4,
  },
  {
    id: 8,
    name: "Laila Rahman",
    location: "Chittagong, Bangladesh",
    img: "https://randomuser.me/api/portraits/women/90.jpg",
    feedback:
      "Seeing other users’ feedback motivates me to use CivicFix more often.",
    rating: 4,
  },
  {
    id: 9,
    name: "Rashed Khan",
    location: "Khulna, Bangladesh",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    feedback: "Excellent service and easy to navigate. I highly recommend it.",
    rating: 5,
  },
  {
    id: 10,
    name: "Sumaiya Noor",
    location: "Sylhet, Bangladesh",
    img: "https://randomuser.me/api/portraits/women/34.jpg",
    feedback:
      "I appreciate how CivicFix connects the community. Very effective platform!",
    rating: 5,
  },
];

export default function CommunityFeedback() {
  return (
    <Container>
      {/* Title + Description */}

      <Heading
        title="Community Feedback"
        subtitle="See how our platform is helping users solve problems efficiently and
            share their experiences."
        center="true"
      />
     

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((f) => (
          <SwiperSlide key={f.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: f.id * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex flex-col h-[280px]"
              /* fixed height for all cards */
            >
              {/* Feedback + rating */}
              <div className="flex-1 overflow-hidden">
                <FaQuoteLeft className="text-primary text-2xl mb-4" />
                <p className="text-gray-700 mb-4 line-clamp-6">{f.feedback}</p>
                {/* line-clamp-6 limits height, add tailwind plugin for line-clamp */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < f.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* User info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{f.name}</h4>
                  <p className="text-gray-500 text-sm">{f.location}</p>
                </div>
              </div>

              {/* Button */}
              <button className="mt-auto px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition">
                Share Your Experience
              </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
