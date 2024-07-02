import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import Layout from "./components/layout/Layout";
import SplashPage from "./pages/Spash";
import { Suspense } from "react";
import GameLayout from "./components/layout/GameLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <Layout>
      <Suspense fallback={<SplashPage />}>
        <GameLayout />
      </Suspense>
    </Layout>
  </RecoilRoot>
);
