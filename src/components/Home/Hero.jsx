import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, 
  ArrowRight,
  MapPin,
  FileText,
  TrendingUp,
  Users,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      img: "https://i.ibb.co.com/JPgcVsk/hero1.avif",
      title: "Report Civic Issues",
      subtitle: "Instantly",
      desc: "Transform your city with a tap. Report infrastructure problems and watch them get resolved.",
      stat: "10K+ Issues Resolved",
      icon: AlertCircle,
      color: "from-blue-600 to-purple-600"
    },
    {
      img: "https://i.ibb.co.com/0p54JtrB/hero2.jpg",
      title: "Your Voice",
      subtitle: "Your City",
      desc: "Join thousands of citizens building better communities through transparent civic engagement.",
      stat: "50K+ Active Citizens",
      icon: Users,
      color: "from-emerald-600 to-teal-600"
    },
    {
      img: "https://i.ibb.co.com/vCZyyY41/hero3.jpg",
      title: "Real-Time",
      subtitle: "Tracking",
      desc: "Stay informed with live updates from submission to resolution. Full transparency guaranteed.",
      stat: "98% Satisfaction Rate",
      icon: FileText,
      color: "from-orange-600 to-red-600"
    },
    {
      img: "https://i.ibb.co.com/sdHRT7Rh/hero4jpg.jpg",
      title: "Measurable",
      subtitle: "Impact",
      desc: "Data-driven solutions that create lasting change. See the difference your reports make.",
      stat: "85% Faster Resolution",
      icon: TrendingUp,
      color: "from-violet-600 to-pink-600"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[activeSlide];

  return (
    <div className="p-5 md:p-0">
    <div className="relative h-[70vh] w-full overflow-hidden bg-gray-900 max-w-7xl mx-auto rounded-2xl  mt-10 -mb-6 ">
      {/* Background Image with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.img}
            alt={currentSlide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-linear(rgba(255,255,255,0.1)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size[40px_40px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Content - Takes up 7 columns on large screens */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Icon with Glow Effect */}
            <motion.div
              key={activeSlide + "-icon"}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
              className="inline-block"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-linear-to-br ${currentSlide.color} p-1 shadow-2xl`}>
                <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                  <currentSlide.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title with Split Animation */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1
                key={activeSlide + "-title"}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
              >
                {currentSlide.title}
              </motion.h1>
              <motion.h2
                key={activeSlide + "-subtitle"}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-3xl sm:text-4xl md:text-5xl pb-5 font-black bg-linear-to-r ${currentSlide.color} bg-clip-text text-transparent`}
              >
                {currentSlide.subtitle}
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              key={activeSlide + "-desc"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed"
            >
              {currentSlide.desc}
            </motion.p>

            {/* Stats Badge & CTA Buttons */}
            <motion.div
              key={activeSlide + "-actions"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2"
            >
              {/* Stats Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Shield className="text-emerald-400" size={16} />
                <span className="text-white text-sm font-semibold">{currentSlide.stat}</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link to={"/dashboard/user/report-issue"} className={`group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r ${currentSlide.color} rounded-lg font-bold text-white text-sm sm:text-base shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer`}>
                  <span className="relative z-10 flex items-center gap-2">
                    Report Issue
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-lg font-bold text-white text-sm sm:text-base hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right - Feature Cards - Takes up 5 columns on large screens */}
          <motion.div
            key={activeSlide + "-cards"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              { icon: AlertCircle, text: "Quick Report", desc: "30 sec" },
              { icon: MapPin, text: "GPS Track", desc: "Auto locate" },
              { icon: FileText, text: "Live Updates", desc: "Real-time" },
              { icon: TrendingUp, text: "Analytics", desc: "Impact data" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 sm:p-5 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              >
                <feature.icon className={`mb-2 sm:mb-3 text-white group-hover:scale-110 transition-transform`} size={28} />
                <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 sm:mb-1">{feature.text}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className="group relative"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                idx === activeSlide 
                  ? "w-8 sm:w-12 bg-white" 
                  : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
            {idx === activeSlide && (
              <motion.div
                layoutId="activeSlide"
                className={`absolute inset-0 rounded-full bg-linear-to-r ${currentSlide.color} blur-sm opacity-50`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Floating Particles - Reduced for 60vh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.6 : 400),
              opacity: Math.random() * 0.4
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.6 : 400)],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Pulse Effect on Icon */}
      <motion.div
        className={`absolute top-6 right-6 sm:top-8 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-r ${currentSlide.color} opacity-20 blur-xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
    </div>
  );
}