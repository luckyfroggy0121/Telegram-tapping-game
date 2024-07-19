import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initialTelegramData } from "./interface/initialTelegramData";

interface TelegramWebApp {
  initDataUnsafe: initialTelegramData;
  expand: () => void;
  disableVerticalSwipes: () => void;
  onEvent: unknown;
  offEvent: unknown;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

const Main = () => {
  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
