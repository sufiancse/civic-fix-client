import { motion } from "framer-motion";

const Heading = ({ title, subtitle, center }) => {


  return (
    <div className="pt-12 sm:pt-16 lg:pt-20 mb-8 sm:mb-10 lg:mb-12">
      <div className={center ? "text-center" : "text-start"}>
        <motion.div
          className="font-bold tracking-tight text-gray-900
               text-2xl sm:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          {title}
        </motion.div>
        <motion.div
          className="mt-3 max-w-2xl mx-auto text-gray-600
              text-sm sm:text-base lg:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.1,
          }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.div>
      </div>
    </div>
  );
};

export default Heading;
