interface TelegramWebApp {
  expand(): void;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

declare const Telegram: Telegram | undefined;
