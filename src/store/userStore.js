import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      loginModalOpen: false,

      // ✅ Set user and token
      setUser: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
          loginModalOpen: false,
        }),

      // ✅ Log out
      logOut: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        }),

      // ✅ Modal control
      setLoginModalOpen: (isOpen) => set({ loginModalOpen: isOpen }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
