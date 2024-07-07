import { useSpring, animated } from "@react-spring/web";

const AnimatedNumber = ({
  number,
  x,
  y,
}: {
  number: number;
  x: number;
  y: number;
}) => {
  const props = useSpring({
    from: { opacity: 1, transform: `translate(${x}px, ${y}px)` },
    to: { opacity: 0, transform: `translate(${x}px, ${y - 50}px)` },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={props}
      className="absolute z-50 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold"
    >
      +{number}
    </animated.div>
  );
};

export default AnimatedNumber;
