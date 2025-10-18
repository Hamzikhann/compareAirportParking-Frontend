import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const bookingDataStore = create(
  persist(
    (set) => ({
      bookingData: {
        airport: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
      },

      setBookingData: (data) => set({ bookingData: data }),

      clearBookingData: () =>
        set({
          bookingData: {
            airport: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
          },
        }),
    }),
    {
      name: "booking-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default bookingDataStore;
