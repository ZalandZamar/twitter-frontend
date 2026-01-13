import { createContext, useState, useEffect } from "react";
import type { PropsWithChildren, Dispatch, SetStateAction } from "react";

type Post = {
  _id: string;
  createdBy: string;
  createdAt: string;
  type: string;
  post?: string; // optional field for retweets
  user?: string;
  ReComment?: string;
};

type DataContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  token: string;
  setToken: (newToken: string) => void;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  cursor: string | null;
  setCursor: Dispatch<SetStateAction<string | null>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSetToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleSetIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      setToken("");
      localStorage.removeItem("token");
      setPosts([]);
      setCursor(null);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn: handleSetIsLoggedIn,
        token,
        setToken: handleSetToken,
        posts,
        setPosts,
        cursor,
        setCursor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
