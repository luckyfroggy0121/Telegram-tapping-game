import { useSpring, animated } from "@react-spring/web";

const AnimatedNumber = ({
  number,
  x,
  y,
  onClick
}: {
  number: number;
  x: number;
  y: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const props = useSpring({
    from: { opacity: 1, transform: `translate(${x}px, ${y}px)` },
    to: { opacity: 0, transform: `translate(${x}px, ${y - 50}px)` },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={props}
      onClick={onClick}
      className="absolute text-3xl z-50 font-bold text-white transform -translate-x-1/2 left-1/2"
    >
      +{number}
    </animated.div>
  );
};

export default AnimatedNumber;
