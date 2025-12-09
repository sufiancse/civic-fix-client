const Heading = ({ title, subtitle, center }) => {
  return (
    <div className="mt-15 mb-3 md:mt-20 md:mb-5">
      <div className={center ? "text-center" : "text-start"}>
        <div className="text-2xl md:text-4xl font-bold text-primary">{title}</div>
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      </div>
    </div>
  );
};

export default Heading;
