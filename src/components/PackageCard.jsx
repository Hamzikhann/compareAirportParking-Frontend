import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import useUserStore from "../store/userStore";
import selectedPackageStore from "../store/selectedPackage";

function PackageCard({ data }) {
	const navigate = useNavigate();
	const { setSelectedPackage } = selectedPackageStore();
	const { isLoggedIn } = useUserStore();

	if (!data || data.length === 0) {
		return <p className="text-center text-gray-500 py-8">No packages available.</p>;
	}

	const formatTitle = (name) => {
		return name.toLowerCase().includes("luton") ? "Park Pilot - Luton" : `Park Pilot - ${name}`;
	};

	const handleParkHere = (item) => {
		setSelectedPackage(item);
		navigate("/package-details");
	};

	const isFullyBooked = (price) => price.includes("Sorry") || price.includes("Fully Booked");

	return (
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
									<span className={`text-lg font-bold ${isFullyBooked(item.price) ? "text-red-600" : "text-gray-900"}`}>
										{isFullyBooked(item.price) ? "Fully Booked" : item.price}
									</span>

									{!isFullyBooked(item.price) && (
										<button
											onClick={() => handleParkHere(item)}
											className="bg-[#b5e074] hover:bg-[#a3d165] text-[#18454f] px-6 py-2 rounded-lg font-medium transition-colors duration-200"
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
	);
}

export default PackageCard;
