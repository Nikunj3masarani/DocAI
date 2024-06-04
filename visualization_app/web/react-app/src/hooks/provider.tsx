// built with insights from https://www.digitalocean.com/community/tutorials/gatsbyjs-state-management-in-gatsby
import { stringify } from "querystring";
import React, { useState } from "react";
import {
  eraseCookie,
  getCookie,
  getLocalStorage,
  setLocalStorage,
} from "../components/utils";

export interface AppContextType {
  user: any;
  setUser: any;
  logout: any;
  cookie_name: string;
  darkMode: string;
  setDarkMode: any;
}

const cookie_name = "app_cookie_";
const defaultMode = "light";
export const appContext = React.createContext<AppContextType>(
  {} as AppContextType
);
const Provider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const initDarkMode = getLocalStorage("darkmode", false) || defaultMode;

  const [darkMode, setDarkMode] = useState(initDarkMode);

  console.log("darkmode", darkMode);

  const logout = () => {
    setUser(null);
    eraseCookie(cookie_name);
  };

  const updateDarkMode = (darkMode: string) => {
    setDarkMode(darkMode);
    setLocalStorage("darkmode", darkMode, false);
  };

  return (
    <appContext.Provider
      value={{
        user,
        setUser,
        logout,
        cookie_name,
        darkMode,
        setDarkMode: updateDarkMode,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default ({ element }: any) => <Provider>{element}</Provider>;
