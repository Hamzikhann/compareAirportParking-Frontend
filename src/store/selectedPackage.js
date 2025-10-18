import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const selectedPackageStore = create(
  persist(
    (set) => ({
      packages: [],
      selectedPackage: null,

      setPackages: (data) => set({ packages: data }),
      setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),

      clearPackages: () => set({ packages: [], selectedPackage: null }),
    }),
    {
      name: "selected-package-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default selectedPackageStore;
