import { ReactNode, createContext, useEffect } from "react";
import { auth } from "../config/firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import useLocalStorageState from "use-local-storage-state";

interface IAuthContextProps {
  children: ReactNode;
}
interface IContextProps {
  user: User | null;
}

export const Context = createContext<IContextProps>({} as IContextProps);

export function AuthContext({ children }: IAuthContextProps) {
  const [user, setUser] = useLocalStorageState<User | null>("UserOfToDoList", {
    defaultValue: null,
  });

  useEffect(() => {
    console.log(user);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const value = { user };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
