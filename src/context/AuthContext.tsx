import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

interface IAuthContextProps {
  children: ReactNode;
}
interface IContextProps {
  user: User | null;
}

export const Context = createContext<IContextProps>({} as IContextProps);

export function AuthContext({ children }: IAuthContextProps) {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    console.log(user);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const value = { user };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
