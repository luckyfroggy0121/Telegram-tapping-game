import React from "react";
import MediaQuery from "react-responsive";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MediaQuery maxWidth={600}>
        {children}
      </MediaQuery>
      <MediaQuery minWidth={601}>
        <div className="w-full h-screen text-center flex items-center justify-center bg-gray-800 text-white text-xl">
          Sorry, you are not allowed to <br /> use PC or big screens.
        </div>
      </MediaQuery>
    </>
  );
};

export default Layout;
