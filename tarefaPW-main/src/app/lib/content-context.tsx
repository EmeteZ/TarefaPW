"use client";

import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContentState {
  user: number;
  setUser: (newUser: SetStateAction<number>) => void;
}

const ContentContext = createContext<ContentState>({
  user: 0,
  setUser: () => {},
});

export const ContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(0);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <ContentContext.Provider value={{ user, setUser }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
