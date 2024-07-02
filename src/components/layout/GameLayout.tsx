import HomePage from "@/pages/Home";
import Navbar from "../common/Navbar";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { tabsAtom } from "@/lib/atom";
import JoinTank from "@/pages/JoinTank";

const tabs = [
  {
    name: "home",
    Component: HomePage,
  },
  {
    name: "jointank",
    Component: JoinTank,
  },
];

const GameLayout = () => {
  const tabsState = useRecoilValue(tabsAtom);

  const currentTab = tabs.find(
    (tab) => tab.name === tabsState[tabsState.length - 1]
  );

  return (
    <div className="h-full">
      <Navbar />
      {currentTab && (
        <div className="z-20 relative">{<currentTab.Component />}</div>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default GameLayout;
