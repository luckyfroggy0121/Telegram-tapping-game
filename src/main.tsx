import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import "./index.css";
import App from "./App";
import BaseProvider from "./context/BaseProvider";
import { initialTelegramData } from "./interface/initialTelegramData";
import { useUser } from "./hooks/useUser";

interface TelegramWebApp {
  initDataUnsafe: initialTelegramData;
  expand: () => void;
  disableVerticalSwipes: () => void;
  onEvent:any
  offEvent:any
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

const Main = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <BaseProvider>
      <App />
    </BaseProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
