import SaveIcon from "@/assets/svg/save.svg?react";
import DropIcon from "@/assets/svg/dropIcon.svg";

const tasks = [
  {
    title: "Join SmartLitre Community",
    drops: 5000,
  },
];

const Earn = () => {
  return (
    <div className="flex flex-col items-center pt-2">
      <div className="font-extrabold text-[20px] leading-6">
        Earn more DROPS
      </div>
      <img src={DropIcon} alt="drop" className="h-12 mt-2" />
      <SaveIcon className="-mt-4" />
    </div>
  );
};

export default Earn;
