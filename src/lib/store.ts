import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Empresa {
  id: string;
  nit: string;
  nombre: string;
  sector: string;
  ciudad: string;
  plan: string;
}

interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

interface AppState {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Empresa activa
  empresa: Empresa | null;
  setEmpresa: (empresa: Empresa | null) => void;
  
  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Notifications
  notifications: Array<{ id: string; type: string; message: string; read: boolean }>;
  addNotification: (type: string, message: string) => void;
  markRead: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      setUser: (user) => set({ user }),
      
      // Empresa
      empresa: null,
      setEmpresa: (empresa) => set({ empresa }),
      
      // UI
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      // Notifications
      notifications: [],
      addNotification: (type, message) =>
        set((state) => ({
          notifications: [
            { id: Date.now().toString(), type, message, read: false },
            ...state.notifications.slice(0, 49),
          ],
        })),
      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
    }),
    { name: 'finanziastock-store' }
  )
);
