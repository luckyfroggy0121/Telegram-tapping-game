import { useSpring, animated } from "@react-spring/web";

const AnimatedNumber = ({ number }: { number: number }) => {
  const props = useSpring({
    from: { opacity: 1, transform: "translateY(0px)" },
    to: { opacity: 0, transform: "translateY(-50px)" },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={props}
      className="absolute z-50 left-1/2 transform -translate-x-1/2 text-[#65E4F0] text-xl"
    >
      +{number}
    </animated.div>
  );
};

export default AnimatedNumber;
