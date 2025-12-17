import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa"

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './hero.css'

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Container from "../Shared/Container";

export default function Hero() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const slides = [
    {
      img: "https://i.ibb.co.com/JPgcVsk/hero1.avif",
      title: "Report Civic Issues Instantly",
      desc: "Report road damage, drainage, street light and more — easily from your phone.",
      btn: "Report an Issue",
      icon: AiOutlineExclamationCircle
    },
    {
      img: "https://i.ibb.co.com/0p54JtrB/hero2.jpg",
      title: "Your Voice, Your City",
      desc: "Connect citizens and authorities together to solve real civic problems.",
      btn: "View Issues Near You",
      icon: GoLocation
    },
    {
      img: "https://i.ibb.co.com/vCZyyY41/hero3.jpg",
      title: "Track Issues in Real Time",
      desc: "Get transparent updates from report submission to final resolution.",
      btn: "Track Status",
      icon: RiFileList3Line
    },
    {
      img: "https://i.ibb.co.com/sdHRT7Rh/hero4jpg.jpg",
      title: "From Problem to Solution",
      desc: "Watch how reported issues are fixed and cities become better.",
      btn: "See Progress",
      icon: FaChartLine
    },
  ];

  return (
    <Container>
      <section className="h-[60vh] mt-10">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full ">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                  {/* Animation*/}
                  <motion.h1
                    key={activeIndex} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    key={activeIndex + "-desc"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="max-w-2xl mb-6 text-gray-200 text-lg drop-shadow-lg"
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    key={activeIndex + "-btn"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    <button className="flex items-center gap-2 px-5 py-2 md:px-7 md:py-3 bg-primary text-white font-semibold rounded-full border border-transparent hover:bg-secondary-focus hover:scale-105 focus:outline-none focus:ring-0 transition-all duration-300 shadow-lg">
                       {slide.btn} <slide.icon />
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </section>
    </Container>
  );
}
