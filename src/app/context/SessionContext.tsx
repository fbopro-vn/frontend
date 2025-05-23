"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

interface SessionContextType {
  sessionId: string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    let storedSession = Cookies.get("sessionId");
    if (!storedSession) {
      storedSession = uuidv4();
      Cookies.set("sessionId", storedSession, { expires: 7, path: "/" }); // Lưu session 7 ngày
    }
    setSessionId(storedSession);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
