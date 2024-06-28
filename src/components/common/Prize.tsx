import React from "react";
import { Button } from "../ui/button";
import Diamod from "@/assets/images/diamond.png";
import Lightning from "@/assets/images/lightning.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { displayNumbers } from "@/lib/utils";

interface PrizeProps {
  diamonds: number;
  medalTitle: string;
  index: number;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

const Prize = ({ diamonds, Icon, medalTitle, index }: PrizeProps) => {
  return (
    <>
      <Button
        className="w-[198px] bg-[#AD12F5C2] h-[44px] font-bold text-[16px] leading-5 rounded-[30px]"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        Join Tank
      </Button>
      <div className="flex mt-3 items-center gap-2 font-extrabold text-[36px] text-white">
        <img src={Diamod} alt="diamond" className="h-9" />
        <div>{displayNumbers(diamonds)}</div>
      </div>
      <div className="bg-[#C3C3C340] mt-2 gap-2 font-bold text-[15px] w-auto px-6 py-1 justify-center h-auto text-white flex rounded-[11px] items-center">
        <div>{medalTitle}</div>
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      <div className="w-full px-5 mt-5">
        <div className="flex justify-between text-white font-bold">
          <div className="text-[11px]">Hydration Goal</div>
          <div className="text-[10px]">Level {index}/6</div>
        </div>
        <ProgressBar completed={(index / 6) * 100}
          bgColor="#65E4F0"
          height="5px"
          className="mt-1 mb-2"
          isLabelVisible={false}
          borderRadius="10px"
          baseBgColor="#C3C3C340"
         />
        <div className="items-center mt-2 flex gap-2">
          <img src={Lightning} alt="lightning" />
          <div className="text-white font-extrabold text-[10px]">500/500</div>
        </div>
      </div>
    </>
  );
};

export default Prize;
