import React, { createContext, useState, useEffect } from "react";
import Gun from "gun";

const UserContext = createContext();
const gun = Gun(["http://172.16.131.85:9000/gun"]);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: localStorage.getItem("userId"),
    hostName: localStorage.getItem("hostName"),
    email: localStorage.getItem("email"),
  });

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const hostName = localStorage.getItem("hostName");
    const email = localStorage.getItem("email");

    if (id && hostName && email) {
      setUser({ id, hostName, email });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, gun }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
