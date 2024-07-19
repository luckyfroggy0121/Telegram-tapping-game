/* eslint-disable react-hooks/exhaustive-deps */
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
import { useSetRecoilState } from "recoil";
import { errorAtom } from "@/lib/atom";

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
  const setError = useSetRecoilState(errorAtom);

  useEffect(() => {
    const initializeTelegramWebApp = async () => {
      try {
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
            balance: Number(localStorage.getItem("balance") ?? 0),
            level: Number(localStorage.getItem("level") ?? 0),
            energyMax: Number(localStorage.getItem("energyMax") ?? "500"),
            dropsAmount: Number(localStorage.getItem("dropsAmount") ?? "1"),
            tank: JSON.stringify(localStorage.getItem("currentTank")),
          } as User;

          const telegramId = teleUser?.id;
          if (telegramId) {
            saveUser(currentUser);
            setUser(currentUser);
            setLoading(false);
          }
        } else {
          setError("Telegram WebApp is not available");
        }
      } catch (error) {
        setError("Telegram User not available");
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
