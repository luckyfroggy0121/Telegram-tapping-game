import { seaCreatures } from "@/lib/seacreatures";
import { Button } from "@/components/ui/button";
import Diamod from "@/assets/images/diamond.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { displayNumbers } from "@/lib/utils";
import { BsLightningFill } from "react-icons/bs";
import { useState } from "react";
import Confetti from "react-confetti";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentDataAtom, tabsAtom } from "@/lib/atom";
import Controls from "@/components/common/Controls";
import AnimatedNumber from "@/components/common/AnimatedNumber";

const HomePage = () => {
  const { Medal, drops, title, Fish } = seaCreatures[0];
  const [showConfetti] = useState(false);
  const [waterLevel] = useState(0);
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const setCurrentSeaCreature = useSetRecoilState(currentDataAtom);
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleClick = () => {
    setNumbers([...numbers, 10]);
  };

  return (
    <>
      <div className="flex px-3 flex-col items-center">
        <Button
          onClick={() => {
            setTabs([...tabs, "jointank"]);
          }}
          className="w-[198px] bg-[#AD12F5C2] h-[44px] font-bold text-[16px] leading-5 rounded-[30px]"
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          Join Tank
        </Button>
        <div className="flex mt-1 justify-center items-center gap-2 font-extrabold text-[36px]">
          <img src={Diamod} alt="diamond" className="mt-1 h-9" />
          <div>{displayNumbers(drops)}</div>
        </div>
        <Button
          onClick={() => {
            setCurrentSeaCreature({
              image: Fish,
              medal: title,
              waterLevel,
            });
            setTabs([...tabs, "leaderboard"]);
          }}
          className="bg-[#C3C3C340] gap-2 font-bold text-[15px] w-auto px-6 py-1 justify-center h-auto flex rounded-[11px] items-center"
        >
          <div>{title}</div>
          {Medal && <Medal className="h-5 w-5" />}
        </Button>
        <div className="w-full px-4 mt-3">
          <div className="flex justify-between font-bold">
            <div className="text-[11px]">Hydration Goal</div>
            <div className="text-[10px]">
              Level {waterLevel === 0 ? 0 : Math.floor((waterLevel / 100) * 6)}
              /6
            </div>
          </div>
          <ProgressBar
            completed={waterLevel}
            bgColor="#65E4F0"
            height="5px"
            className="mt-1 mb-2"
            isLabelVisible={false}
            borderRadius="10px"
            baseBgColor="#C3C3C340"
          />
          <div className="items-center mt-2 flex gap-1">
            <BsLightningFill color="#ffcc20" />
            <div className="font-extrabold text-[10px]">500/500</div>
          </div>
        </div>
        <div className="absolute top-[50%] w-24 h-24 mt-5">
          {numbers.map((number, index) => (
            <AnimatedNumber key={index} number={number} />
          ))}
        </div>
        <div
          onClick={handleClick}
          className="h-[15rem] w-full bg-contain bg-center bg-[#5417b0] relative overflow-hidden mt-2"
          style={
            waterLevel === 100
              ? {
                  backgroundImage: `url(${Fish})`,
                  backgroundColor: "transparent",
                }
              : {
                  maskImage: `url(${Fish})`,
                  maskSize: "100% 100%",
                  maskPosition: "center",
                }
          }
        ></div>
        {showConfetti && (
          <Confetti className="w-full h-screen absolute top-0 z-50 " />
        )}
      </div>
      <Controls />
    </>
  );
};

export default HomePage;
