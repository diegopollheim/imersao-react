import {useRouter} from "next/router";
import {createContext, useContext, useEffect, useState} from "react";
import db from "../lib/supaBaseConfig";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const route = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    let user = db.auth.user();
    if (user) {
      setUser(user);
      route.push("/chat");
      console.log(user);
    }
  }, []);

  return <AuthContext.Provider value={{user, setUser}}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
