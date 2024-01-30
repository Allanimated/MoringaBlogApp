import React, { useContext, useState } from "react";

const userContext = React.createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  return (
    <userContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

const useGlobalUserContext = () => {
  return useContext(userContext);
};

export { UserProvider, useGlobalUserContext };
