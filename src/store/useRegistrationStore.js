import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useRegistrationStore = create(
  persist(
    (set) => ({
      registration: null,
      setRegistration: (registration) => set({ registration }),
      clearRegistration: () => set({ registration: null }),
    }),
    {
      name: "registration-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRegistrationStore;
