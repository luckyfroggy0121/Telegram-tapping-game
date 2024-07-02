import Logo from "@/assets/svg/logo.svg?react";
import LogoText from "@/assets/svg/logo-text.svg?react";

const SplashPage = () => {
  return (
    <div className="flex gap-5 items-center justify-center flex-col h-screen">
      <Logo />
      <div className="overflow-hidden">
        <LogoText className="animate-appearFromBottom" />
      </div>
    </div>
  );
};

export default SplashPage;
