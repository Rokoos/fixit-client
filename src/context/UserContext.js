import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    carMake: "",
    carModel: "",
    engine: "",
    year: "",
    agdCategory: "",
    rtvCategory: "",
    computerCategory: "",
    gardenCategory: "",
    location: "",
    urgent: "",
    category: "",
  });

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    isAdmin,
    setIsAdmin,
    isLoading,
    setIsLoading,
    filters,
    setFilters,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
