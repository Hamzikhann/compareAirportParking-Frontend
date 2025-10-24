import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const selectedPackageStore = create(
	persist(
		(set) => ({
			packages: [],
			selectedPackage: null,
			selectedDetails: null,
			setPackages: (data) => set({ packages: data }),
			setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),
			setSelectedDetails: (data) => set({ selectedDetails: data }),
			clearPackages: () => set({ packages: [], selectedPackage: null })
		}),
		{
			name: "selected-package-storage",
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

export default selectedPackageStore;
