import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Layout from "./components/layout/Layout";
import SplashPage from "./pages/Spash";
import { Suspense } from "react";
import GameLayout from "./components/layout/GameLayout";
import JoinTank from "./pages/JoinTank";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <Layout>
      <Suspense fallback={<SplashPage />}>
        <GameLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/join-tank" element={<JoinTank />} />
            </Routes>
          </BrowserRouter>
        </GameLayout>
      </Suspense>
    </Layout>
  </RecoilRoot>
);
