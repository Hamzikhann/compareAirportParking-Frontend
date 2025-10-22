import React, { useState } from "react";
import { TiPlaneOutline } from "react-icons/ti";
import { FaPlaneUp } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { format, isToday, isBefore, addDays } from "date-fns";
import bookingDataStore from "../store/bookingDataStore";
import selectedPackageStore from "../store/selectedPackage";
import ApiService from "../services/ApiServices";
import enUS from "date-fns/locale/en-US";
import { Alert, Snackbar, Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/material";
function Searchbar() {
	const [airport, setAirport] = useState("");
	const [checkInDateTime, setCheckInDateTime] = useState(null);
	const [checkOutDateTime, setCheckOutDateTime] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const { setBookingData } = bookingDataStore();
	const { setPackages } = selectedPackageStore();

	// Initialize with tomorrow as minimum date
	const minDate = addDays(new Date(), 1);

	const isFormValid = airport && checkInDateTime && checkOutDateTime;

	const airports = [
		{ label: "Denver Airport", value: "denver", icon: <FaPlaneUp size={18} /> },
		{ label: "Seattle (SEA)", value: "seattle", icon: <FaPlaneUp size={18} /> },
		{ label: "Stansted", value: "stansted", icon: <FaPlaneUp size={18} /> }
	];

	const validateDates = () => {
		if (!checkInDateTime || !checkOutDateTime) {
			return "Please select both check-in and check-out dates/times";
		}

		// Check if check-in is today
		if (isToday(checkInDateTime)) {
			return "Check-in cannot be today. Please select a future date.";
		}

		// Check if check-in is before today
		if (isBefore(checkInDateTime, new Date())) {
			return "Check-in cannot be in the past";
		}

		// Check if check-out is before check-in
		if (isBefore(checkOutDateTime, checkInDateTime)) {
			return "Check-out must be after check-in";
		}

		// Check if same day but check-out time is not after check-in
		if (checkInDateTime.toDateString() === checkOutDateTime.toDateString() && checkOutDateTime <= checkInDateTime) {
			return "Check-out time must be after check-in time";
		}

		return null;
	};

	const handleCheckInChange = (newValue) => {
		if (newValue) {
			// If user selects today, automatically set to tomorrow
			if (isToday(newValue)) {
				newValue = addDays(newValue, 1);
			}
			setCheckInDateTime(newValue);

			// If check-out is before new check-in, adjust check-out
			if (checkOutDateTime && isBefore(checkOutDateTime, newValue)) {
				setCheckOutDateTime(addDays(newValue, 1));
			}
		}
	};

	const handleCheckOutChange = (newValue) => {
		if (newValue) {
			// Ensure check-out is after check-in
			if (checkInDateTime && isBefore(newValue, checkInDateTime)) {
				setError("Check-out must be after check-in");
				return;
			}
			setCheckOutDateTime(newValue);
			setError(""); // Clear error if validation passes
		}
	};

	const handleSearch = async () => {
		const validationError = validateDates();
		if (validationError) {
			setError(validationError);
			return;
		}

		if (!isFormValid) return;
		setIsLoading(true);

		try {
			const formattedCheckInDate = format(checkInDateTime, "yyyy-MM-dd");
			const formattedCheckOutDate = format(checkOutDateTime, "yyyy-MM-dd");
			const formattedCheckInTime = format(checkInDateTime, "hh:mm a");
			const formattedCheckOutTime = format(checkOutDateTime, "hh:mm a");

			const payload = {
				airport: airport === "stansted" ? "Stansted" : airport,
				startDate: formattedCheckInDate,
				endDate: formattedCheckOutDate,
				startTime: formattedCheckInTime,
				endTime: formattedCheckOutTime
			};

			setBookingData(payload);

			const response = await ApiService.postRequest({
				path: "search",
				payload: payload
			});

			if (response?.status === 200) {
				setPackages(response.data?.data || []);
				console.log("Packages received:", response.data?.data || []);
				navigate("/packages");
			} else {
				setError(response?.data?.message || "Something went wrong");
			}
		} catch (err) {
			console.error("Error fetching data:", err);
			setError("Failed to connect to the server");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<LocalizationProvider
				dateAdapter={AdapterDateFns}
				adapterLocale={enUS}
				dateFormats={{
					normalDate: "dd/MM/yyyy",
					keyboardDate: "dd/MM/yyyy"
				}}
			>
				<div className="flex flex-col gap-4">
					{/* Top Label */}
					<div className="bg-white w-full max-w-[200px] mx-auto sm:mx-0 text-center bg-opacity-25 rounded-full py-2 px-3 flex items-center justify-center gap-1 text-white text-sm sm:text-base font-light">
						<TiPlaneOutline size={16} className="sm:w-5 sm:h-5" />
						<p>Airport Parking Only</p>
					</div>

					{/* Main Search Row */}
					<div className="bg-white flex h-[20rem] sm:w-[30rem] lg:w-auto lg:h-auto space-y-4 lg:space-y-0 flex-col lg:flex-row items-center justify-center gap-3 rounded-lg lg:rounded-full py-4 px-4 sm:px-5">
						{/* Airport Dropdown */}
						<Dropdown
							options={airports}
							placeholder="Select Airport..."
							width="w-full lg:w-[250px]"
							rounded="rounded-md"
							onChange={(val) => setAirport(val)}
						/>

						{/* Check-In */}
						<div className="relative w-full lg:w-[230px]">
							<DateTimePicker
								label="Check-In"
								value={checkInDateTime}
								onChange={handleCheckInChange}
								minDate={minDate}
								disablePast
								inputFormat="dd/MM/yyyy hh:mm a"
								ampm={true}
								slotProps={{
									textField: {
										size: "small",
										fullWidth: true,
										sx: {
											"& .MuiOutlinedInput-root": {
												borderRadius: "0.375rem",
												paddingY: "2px",
												"& fieldset": {
													borderColor: "#17465c"
												},
												"&:hover fieldset": {
													borderColor: "#17465c"
												},
												"&.Mui-focused fieldset": {
													borderColor: "#17465c"
												}
											},
											"& .MuiInputBase-input": {
												paddingY: "6px"
											},
											"& .MuiInputLabel-root": {
												color: "#374151"
											},
											"& .MuiSvgIcon-root": {
												color: "#17465c"
											}
										}
									}
								}}
							/>
						</div>

						{/* Check-Out */}
						<div className="relative w-full lg:w-[230px]">
							<DateTimePicker
								label="Check-Out"
								value={checkOutDateTime}
								onChange={handleCheckOutChange}
								minDate={checkInDateTime || minDate}
								disablePast
								inputFormat="dd/MM/yyyy hh:mm a"
								ampm={true}
								slotProps={{
									textField: {
										size: "small",
										fullWidth: true,
										sx: {
											"& .MuiOutlinedInput-root": {
												borderRadius: "0.375rem",
												paddingY: "3px",
												"& fieldset": {
													borderColor: "#17465c"
												},
												"&:hover fieldset": {
													borderColor: "#17465c"
												},
												"&.Mui-focused fieldset": {
													borderColor: "#17465c"
												}
											},
											"& .MuiInputBase-input": {
												paddingY: "6px"
											},
											"& .MuiInputLabel-root": {
												color: "#374151"
											},
											"& .MuiSvgIcon-root": {
												color: "#17465c"
											}
										}
									}
								}}
							/>
						</div>

						{/* Search Button */}
						<button
							onClick={handleSearch}
							disabled={!isFormValid || isLoading}
							className={`flex items-center gap-2 justify-center w-full lg:w-auto px-5 py-3 rounded-full font-medium ${
								isFormValid
									? "bg-[#b4e076] text-[#15445f] cursor-pointer hover:bg-[#a3d165] transition-colors"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
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

			{/* Loading Modal
			<Dialog
				open={isLoading}
				disableBackdropClick
				disableEscapeKeyDown
				PaperProps={{
					sx: {
						borderRadius: 2,
						padding: 2
					}
				}}
			>
				<DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Searching for Parking Deals</DialogTitle>
				<DialogContent sx={{ textAlign: "center", minWidth: 300 }}>
					<Typography variant="body1" sx={{ mb: 2 }}>
						We are collecting the best parking deals for you. Please wait...
					</Typography>
					<LinearProgress sx={{ width: "100%" }} />
				</DialogContent>
			</Dialog> */}

			{/* Loading Modal */}

			{/* Loading Modal */}
			<Dialog
				open={isLoading}
				disableBackdropClick
				disableEscapeKeyDown
				PaperProps={{
					sx: {
						borderRadius: 2,
						padding: 0,
						background: "white",
						boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
					}
				}}
			>
				<Box sx={{ p: 4, textAlign: "center" }}>
					{/* Simple Spinner */}
					<Box
						sx={{
							width: 40,
							height: 40,
							margin: "0 auto 20px",
							border: "2px solid #f0f0f0",
							borderTop: "2px solid #b4e076",
							borderRadius: "50%",
							animation: "spin 1s linear infinite"
						}}
					/>

					<DialogTitle
						sx={{
							fontWeight: "600",
							color: "#333",
							fontSize: "1.3rem",
							p: 0,
							mb: 1
						}}
					>
						Searching for Deals
					</DialogTitle>

					<DialogContent sx={{ p: 0 }}>
						<Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
							Please wait while we find the best parking options
						</Typography>

						{/* Simple Progress */}
						<LinearProgress
							sx={{
								height: 2,
								backgroundColor: "transparent",
								"& .MuiLinearProgress-bar": {
									backgroundColor: "#b4e076"
								}
							}}
						/>
					</DialogContent>
				</Box>
			</Dialog>

			{/* Error Snackbar */}
			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={() => setError("")}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity="error" onClose={() => setError("")}>
					{error}
				</Alert>
			</Snackbar>
		</>
	);
}

export default Searchbar;
