import Logo from "@/assets/svg/logo.svg?react";
import { errorAtom } from "@/lib/atom";
import { useRecoilValue } from "recoil";

const LoadingPage = () => {
  const error = useRecoilValue(errorAtom);
  return (
    <div className="flex gap-5 items-center justify-center flex-col h-screen">
      <Logo className="animate-pulse" />
      <div>{error}</div>
    </div>
  );
};

export default LoadingPage;
