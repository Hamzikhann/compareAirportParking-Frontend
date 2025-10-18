import React, { useState } from "react";
import { TiPlaneOutline } from "react-icons/ti";
import { FaPlaneUp } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import bookingDataStore from "../store/bookingDataStore";
import selectedPackageStore from "../store/selectedPackage";
import ApiService from "../services/ApiServices";

function Searchbar() {
  const [airport, setAirport] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setBookingData } = bookingDataStore();
  const { setPackages } = selectedPackageStore();

  // ---- helpers ----
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const minDate = getTomorrow();
  const isFormValid = airport && checkIn && checkOut;

  const airports = [
    { label: "Denver Airport", value: "denver", icon: <FaPlaneUp size={18} /> },
    { label: "Seattle (SEA)", value: "seattle", icon: <FaPlaneUp size={18} /> },
    { label: "Stansted", value: "stansted", icon: <FaPlaneUp size={18} /> },
  ];

  const handleSearch = async () => {
    if (!isFormValid) return;
    setIsLoading(true);

    try {
      const payload = {
        airport: airport === "stansted" ? "Stansted" : airport,
        startDate: format(checkIn, "yyyy-MM-dd"),
        endDate: format(checkOut, "yyyy-MM-dd"),
        startTime: format(checkIn, "hh:mm a"),
        endTime: format(checkOut, "hh:mm a"),
      };
      // console.log("Payload sent to backend:", payload);
      setBookingData(payload);

      const response = await ApiService.postRequest({
        path: "search",
        payload: payload,
      });

      if (response?.status === 200) {
        setPackages(response.data?.data || []);
        console.log("Packages received:", response.data?.data || []);
        navigate("/packages");
      } else {
        alert(response?.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col gap-4">
        {/* Top Label */}
        <div className="bg-white w-[200px] text-center bg-opacity-25 rounded-full py-2 px-3 flex items-center gap-1 text-white text-base font-light">
          <TiPlaneOutline size={20} />
          <p>Airport Parking Only</p>
        </div>

        {/* Main Search Row */}
        <div className="bg-white flex items-center justify-center gap-3 rounded-full py-4 px-5">
          {/* Airport Dropdown */}
          <Dropdown
            options={airports}
            placeholder="Select Airport..."
            width="w-[250px]"
            rounded="rounded-md"
            onChange={(val) => setAirport(val)}
          />

          {/* Check-In */}
          <div className="relative w-[230px]">
            <DateTimePicker
              label="Check-In"
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              disablePast
              minDate={minDate}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.375rem", // ✅ rounded-md
                      paddingY: "2px", // ✅ reduce vertical padding
                      "& fieldset": {
                        borderColor: "#17465c",
                      },
                      "&:hover fieldset": {
                        borderColor: "#17465c",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#17465c",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingY: "6px", // ✅ control inner text field height
                    },
                    "& .MuiInputLabel-root": {
                      color: "#374151",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#17465c",
                    },
                  },
                },
              }}
            />
          </div>

          {/* Check-Out */}
          <div className="relative w-[230px]">
            <DateTimePicker
              label="Check-Out"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              disablePast
              minDate={minDate}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.375rem", // ✅ rounded-md
                      paddingY: "3px",
                      "& fieldset": {
                        borderColor: "#17465c",
                      },
                      "&:hover fieldset": {
                        borderColor: "#17465c",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#17465c",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingY: "6px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#374151",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#17465c",
                    },
                  },
                },
              }}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!isFormValid || isLoading}
            className={`flex items-center gap-2 justify-center px-5 py-3 rounded-full font-medium ${
              isFormValid
                ? "bg-[#b4e076] text-[#15445f] cursor-pointer"
                : "bg-[#b4e076] text-[#15445f] cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                <IoSearch size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default Searchbar;
