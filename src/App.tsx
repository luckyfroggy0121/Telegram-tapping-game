import { RecoilRoot } from "recoil";
import Layout from "./layout/Layout";
import LoadingPage from "./pages/Loading";
import { Suspense, useState, useEffect } from "react";
import GameLayout from "./layout/GameLayout";
import SplashPage from "./pages/Splash";
import { useUser } from "./hooks/useUser";


const App = () => {
  const [showGame, setShowGame] = useState(false);
  const { user } = useUser();

  console.log("this is the user: ", user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGame(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <RecoilRoot>
      <Layout>
        <Suspense fallback={<LoadingPage />}>
          {showGame ? <GameLayout /> : <SplashPage />}
        </Suspense>
      </Layout>
    </RecoilRoot>
  );
};

export default App;
