import React from "react";
import Navbar from "../common/Navbar";
import Controls from "../common/Controls";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full">
      <Navbar />
      {children}
      <Controls />
    </div>
  );
};

export default GameLayout;
