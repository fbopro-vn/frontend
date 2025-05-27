'use client'
import { useEffect, useState, createContext, useContext, ReactNode } from "react";

// 🔹 Đảm bảo userId được truyền vào
interface SessionContextProps {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({
  children,
  userId, // 👈 Thêm userId ở đây (lấy từ context login)
}: {
  children: ReactNode;
  userId: string;
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const key = `session_id_${userId}`; // 👈 tạo theo user
    let id = localStorage.getItem(key);

    if (!id) {
      id = `session-${userId}`;
      localStorage.setItem(key, id);
    }

    setSessionId(id);
  }, [userId]); // 👈 chạy lại khi userId thay đổi

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used inside SessionProvider");
  return context;
};
