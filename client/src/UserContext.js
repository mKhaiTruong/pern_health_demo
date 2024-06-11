import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
