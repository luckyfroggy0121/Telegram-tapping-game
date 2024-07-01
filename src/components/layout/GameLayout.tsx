import Navbar from "../common/Navbar";
import { Toaster } from "react-hot-toast";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="z-20 relative">{children}</div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default GameLayout;
