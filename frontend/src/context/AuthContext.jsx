import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };
  const updateBookmarks = (bookmarks) => {
    const updatedUser = {
      ...user,
      bookmarks,
    };

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        updateBookmarks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
