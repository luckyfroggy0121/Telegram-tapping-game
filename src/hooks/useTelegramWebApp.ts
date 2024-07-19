// src/hooks/useTelegramWebApp.ts
import { useEffect, useState } from 'react';


const useTelegramWebApp = () => {
  const [initData, setInitData] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeTelegramWebApp = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.expand();
        webApp.disableVerticalSwipes();
        setInitData(webApp.initDataUnsafe);
        console.log("this is the initData",webApp.initDataUnsafe)
        setIsInitialized(true);
      } else {
        console.error('Telegram WebApp is not available');
      }
    };

    document.addEventListener('DOMContentLoaded', initializeTelegramWebApp);

    return () => {
      document.removeEventListener('DOMContentLoaded', initializeTelegramWebApp);
    };
  }, []);

  return { initData, isInitialized };
};

export default useTelegramWebApp;
