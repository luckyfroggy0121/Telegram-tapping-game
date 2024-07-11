import toast from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import ThumbsUp from "@/assets/svg/thumbs.svg?react";

export const Toast = (message: string, type: "info" | "success") => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } flex items-center justify-start gap-2 w-full bg-[#6a1fc9] rounded-full ${
        type === "info" ? "py-3" : "py-2"
      } px-3`}
    >
      {type === "info" ? (
        <>
          <BsExclamationCircleFill size={25} />
          <h3 className="text-sm font-bold text-white">{message}</h3>
        </>
      ) : (
        <>
          <ThumbsUp />
          <h3 className="text-xs font-bold text-white">{message}</h3>
        </>
      )}
    </div>
  ));
};
