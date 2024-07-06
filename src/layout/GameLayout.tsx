import HomePage from "@/pages/Home";
import Navbar from "../components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { tabsAtom } from "@/lib/atom";
import JoinTank from "@/pages/JoinTank";
import Leaderboard from "@/pages/Leaderboard";
// import Friends from "@/pages/Friends";
import Earn from "@/pages/Earn";
import { BsExclamationCircleFill } from "react-icons/bs";

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
  // {
  //   name: "friends",
  //   Component: Friends,
  // },
  {
    name: "earn",
    Component: Earn,
  },
];

const GameLayout = () => {
  const tabsState = useRecoilValue(tabsAtom);

  return (
    <div className="min-h-screen flex flex-col relative z-20">
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
          success: {
            className:
              "!w-full !rounded-full !bg-[#6a1fc9] !text-white !font-bold !flex !items-center !justify-start ",
            iconTheme: {
              primary: "white",
              secondary: "#6a1fc9",
            },
          },
          error: {
            className:
              "!w-full !rounded-full !bg-[#6a1fc9] !text-white !font-bold !flex !items-center !justify-start ",
            iconTheme: {
              primary: "white",
              secondary: "#6a1fc9",
            },
            icon: <BsExclamationCircleFill size={25} />,
          },
        }}
      />
    </div>
  );
};

export default GameLayout;
