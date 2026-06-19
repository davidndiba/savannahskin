import React, { createContext, useContext, useState } from 'react';
import type { GuestInfo } from '../types';

interface AppContextType {
  guestInfo: GuestInfo | null;
  setGuestInfo: (info: GuestInfo | null) => void;
  activeChatSessionId: string | null;
  setActiveChatSessionId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [activeChatSessionId, setActiveChatSessionId] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ guestInfo, setGuestInfo, activeChatSessionId, setActiveChatSessionId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
