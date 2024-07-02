import Logo from "@/assets/svg/logo.svg?react";

const LoadingPage = () => {
  return (
    <div className="flex gap-5 items-center justify-center flex-col h-screen">
      <Logo className="animate-pulse"/>
    </div>
  );
};

export default LoadingPage;
