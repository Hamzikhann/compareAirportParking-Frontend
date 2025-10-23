import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import selectedPackageStore from "../store/selectedPackage";
import ApiService from "../services/ApiServices";
import { Alert, Snackbar, Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/material";

function PackageCard({ data }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const { setSelectedPackage, setSelectedDetails } = selectedPackageStore();

	if (!data || data.length === 0) {
		return <p className="text-center text-gray-500 py-8">No packages available.</p>;
	}

	const formatTitle = (name) => {
		return name.toLowerCase().includes("luton") ? "Park Pilot - Luton" : `Park Pilot - ${name}`;
	};

	const handleParkHere = async (item) => {
		setIsLoading(true);

		setSelectedPackage(item);
		console.log(item);

		let data = {
			path: "package-details",
			payload: {
				packageId: item.packageId,
				packageName: item.name,
				airport: item.airport,
				searchUrl: item.searchUrl
			}
		};
		let response = await ApiService.postRequest(data);
		console.log(response);
		setSelectedDetails(response.data.data);
		setIsLoading(false);

		navigate("/package-details");
	};

	const isFullyBooked = (price) => price.includes("Sorry") || price.includes("Fully Booked");

	return (
		<>
			<div className="space-y-6">
				{data.map((item, index) => (
					<div
						key={index}
						className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors duration-200"
					>
						<div className="flex flex-col lg:flex-row gap-6">
							{/* Image */}
							<div className="lg:w-1/3">
								<img className="w-full h-48 lg:h-full object-cover rounded-lg" src={item.image} alt={item.name} />
							</div>

							{/* Content */}
							<div className="lg:w-2/3 flex flex-col">
								<h2 className="text-xl font-semibold text-gray-900 mb-3">{formatTitle(item.name)}</h2>

								<p className="text-gray-600 mb-4 flex-1">{item.description}</p>

								{/* Features */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
									{item.features.map((point, idx) => (
										<div key={idx} className="flex items-center gap-2">
											<FaCheck size={14} className="text-green-500 flex-shrink-0" />
											<span className="text-sm text-gray-700">{point}</span>
										</div>
									))}
								</div>

								{/* Note and Price Section */}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
									<p className="text-sm text-gray-500 italic">{item.note}</p>

									<div className="flex items-center gap-4">
										<span
											className={`text-lg text-nowrap font-bold ${isFullyBooked(item.price) ? "text-red-600" : "text-gray-900"}`}
										>
											{isFullyBooked(item.price) ? "Fully Booked" : item.price}
										</span>

										{!isFullyBooked(item.price) && (
											<button
												onClick={() => handleParkHere(item)}
												className="bg-[#b5e074] text-nowrap hover:bg-[#a3d165] text-[#18454f] px-6 py-2 rounded-lg font-medium transition-colors duration-200"
											>
												Park Here
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
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
		</>
	);
}

export default PackageCard;
