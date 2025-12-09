const Heading = ({ title, subtitle, center }) => {
  return (
    <div className="pt-12 sm:pt-16 lg:pt-20 mb-8 sm:mb-10 lg:mb-12">
      <div className={center ? "text-center" : "text-start"}>
        <div
          className="font-semibold tracking-tight text-gray-900
               text-2xl sm:text-3xl lg:text-4xl"
        >
          {title}
        </div>
        <div
          className="mt-3 max-w-2xl mx-auto text-gray-600
              text-sm sm:text-base lg:text-lg"
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default Heading;
