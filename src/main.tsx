import ReactDOM from "react-dom/client";
import { useEffect, useState } from 'react';
import "./index.css";
import App from "./App";

const getQueryParams = (search: string) => {
  const params = new URLSearchParams(search);
  const userId = params.get('userId') || '';
  const userName = params.get('userName') || '';
  return { userId, userName };
};

const Main = () => {
  const [user, setUser] = useState({ userId: '', userName: '' });

  useEffect(() => {
    const { userId, userName } = getQueryParams(window.location.search);
    setUser({ userId, userName });
  }, []);

  return <App user={user} />;
};


ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
