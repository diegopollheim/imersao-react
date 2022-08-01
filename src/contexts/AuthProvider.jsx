import {useRouter} from "next/router";
import {createContext, useContext} from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const {query} = useRouter();
  const user = query.username;

  return <AuthContext.Provider value={{user}}>{props.children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext)