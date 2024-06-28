import Logo from "@/assets/svg/logo.svg?react";
import LogoText from "@/assets/svg/logo-text.svg?react";

const SplashPage = () => {
  return (
    <div className="flex gap-5 items-center justify-center flex-col h-full">
      <Logo />
      <LogoText />
    </div>
  );
};

export default SplashPage;
