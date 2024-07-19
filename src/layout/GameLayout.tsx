/* eslint-disable react-hooks/exhaustive-deps */
import HomePage from "@/pages/Home";
import Navbar from "../components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { confettiAtom, tabsAtom } from "@/lib/atom";
import JoinTank from "@/pages/JoinTank";
import Leaderboard from "@/pages/Leaderboard";
import Earn from "@/pages/Earn";
import Boost from "@/pages/Boost";
import Friends from "@/pages/Friends";
import Confetti from "react-confetti";
import { useEffect } from "react";

const tabs = [
  {
    name: "home",
    Component: HomePage,
  },
  {
    name: "jointank",
    Component: JoinTank,
  },
  {
    name: "leaderboard",
    Component: Leaderboard,
  },
  {
    name: "friends",
    Component: Friends,
  },
  {
    name: "earn",
    Component: Earn,
  },
  {
    name: "boost",
    Component: Boost,
  },
];

const GameLayout = () => {
  const tabsState = useRecoilValue(tabsAtom);
  const [showConfetti, setShowConfetti] = useRecoilState(confettiAtom);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen flex flex-col relative z-20">
      {showConfetti && (
        <Confetti numberOfPieces={1500} recycle={false} gravity={0.09} />
      )}
      <Navbar />
      {tabs.map((tab) => {
        const { name, Component } = tab;
        return (
          <div
            key={name}
            className={`${
              name !== tabsState[tabsState.length - 1] ? "hidden" : ""
            } grow shrink basis-auto flex flex-col justify-between pb-4`}
          >
            <Component />
          </div>
        );
      })}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default GameLayout;
