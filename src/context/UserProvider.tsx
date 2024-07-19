import { User } from "@/interface/User";
import LoadingPage from "@/pages/Loading";
import { ReactNode, createContext, useEffect, useState } from "react";
import { firestoreDB } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

// function to get the current user from the firestore
export const getUserByTelegramId = async (id: number): Promise<User | null> => {
  try {
    const userRef = collection(firestoreDB, "users");
    const q = query(userRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data() as User;
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Function to fetch a user from the database
export const fetchUser = async (userId: string): Promise<User | null> => {
  const userRef = doc(firestoreDB, "users", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    console.log("No such user!");
    return null;
  }
};

// function to save user to the database
export const saveUser = async (user: User): Promise<void> => {
  const userRef = doc(firestoreDB, "users", user.id.toString());

  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    await updateDoc(userRef, {
      ...user,
    });
  } else {
    await setDoc(userRef, {
      ...user,
    });
  }
};
export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

const UserContextDefaultValues: UserContextType = {
  user: null,
  setUser: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(
  UserContextDefaultValues
);

export type ContextProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: ContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeTelegramWebApp = async () => {
      setLoading(true);
      if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.expand();
        webApp.disableVerticalSwipes();

        const teleUser = webApp.initDataUnsafe?.user;
        const currentUser = {
          id: teleUser.id,
          first_name: teleUser.first_name,
          last_name: teleUser.last_name,
          username: teleUser.username,
          balance: Number(localStorage.getItem("balance")),
          level: Number(localStorage.getItem("level")),
          tank: JSON.stringify(localStorage.getItem("currentTank")),
        } as User;

        const telegramId = teleUser?.id;
        if (telegramId) {
          await saveUser(currentUser);

          const fetchedUser = await fetchUser(telegramId.toString());
          if (fetchedUser) {
             setUser(fetchedUser);
          }else{
            setUser(currentUser);
          }
          setLoading(false);
        }
      } else {
        console.error("Telegram WebApp is not available");
        setLoading(false);
      }
    };

    initializeTelegramWebApp();
  }, []);
  const logout = async () => {
    setLoading(true);
    setUser(null);
  };

  const value: UserContextType = { user, setUser, logout };

  return (
    <UserContext.Provider value={value}>
      {loading ? <LoadingPage /> : children}
    </UserContext.Provider>
  );
}
