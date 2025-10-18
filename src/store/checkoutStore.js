import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCheckoutStore = create(
  persist(
    (set) => ({
      checkoutData: {},
      setCheckoutData: (data) => set({ checkoutData: data }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCheckoutStore;
