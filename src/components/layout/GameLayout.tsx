import Navbar from "../common/Navbar";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="z-20 relative">{children}</div>
    </div>
  );
};

export default GameLayout;
