import React from "react";
import selectedPackageStore from "../store/selectedPackage";
import bookingDataStore from "../store/bookingDataStore";

function SummaryCard() {
	const { selectedPackage } = selectedPackageStore();
	const { bookingData } = bookingDataStore();

	// Prevent errors if selectedPackage is null
	if (!selectedPackage) {
		return (
			<div className="border border-gray-300 rounded-xl lg:sticky lg:top-3 lg:z-40 p-6 bg-white shadow-lg">
				<p className="text-gray-500 text-center font-medium">No package selected</p>
			</div>
		);
	}

	return (
		<>
			{/* summary-card */}
			<div className="border border-gray-200 rounded-xl lg:sticky lg:top-3 lg:z-40 bg-white shadow-xl overflow-hidden">
				<div className="bg-gradient-to-r from-[#b4e172] to-[#1a475b] px-6 py-5">
					<h1 className="text-2xl font-bold text-white flex items-center gap-2">
						<span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold">
							📋
						</span>
						Order Summary
					</h1>
				</div>
				<div className="flex flex-col gap-4 px-6 py-5">
					<div className="bg-gray-50 rounded-lg p-4">
						<p className="text-lg font-semibold text-gray-900">{selectedPackage.name}</p>
						<p className="text-sm font-medium text-gray-700 mt-1">Parking Type: {selectedPackage.type}</p>
						<div className="mt-3 space-y-1">
							<p className="text-sm text-gray-600 flex items-center gap-2">
								<span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
									✓
								</span>
								Check-in: {bookingData?.startDate} - {bookingData?.startTime}
							</p>
							<p className="text-sm text-gray-600 flex items-center gap-2">
								<span className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">
									✗
								</span>
								Check-out: {bookingData?.endDate} - {bookingData?.endTime}
							</p>
							<p className="text-sm text-gray-600 flex items-center gap-2">
								<span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
									🅿️
								</span>
								4 Days of parking
							</p>
						</div>
					</div>
				</div>
				<hr className="border-gray-200" />
				<div className="flex flex-col gap-3 px-6 py-5">
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700 flex items-center gap-2">
							<span className="w-4 h-4 bg-gray-100 rounded-full"></span>
							Subtotal
						</p>
						<p className="text-sm font-medium text-gray-900">{selectedPackage.price}</p>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700 flex items-center gap-2">
							<span className="w-4 h-4 bg-gray-100 rounded-full"></span>
							Booking Fee
						</p>
						<p className="text-sm font-medium text-gray-900">$0.00</p>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700 flex items-center gap-2">
							<span className="w-4 h-4 bg-gray-100 rounded-full"></span>
							Taxes & Fees
						</p>
						<p className="text-sm font-medium text-gray-900">$0.00</p>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700 flex items-center gap-2">
							<span className="w-4 h-4 bg-gray-100 rounded-full"></span>- Airport Access Fee
						</p>
						<p className="text-sm font-medium text-gray-900">$0.00</p>
					</div>
				</div>
				<hr className="border-gray-200" />
				<div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5">
					<div className="flex items-center justify-between">
						<p className="text-lg font-bold text-gray-900">Total</p>
						<p className="text-lg font-bold text-gray-900">{selectedPackage.price}</p>
					</div>
				</div>
				<hr className="border-gray-200" />
				<div className="px-6 py-4">
					<button className="w-full text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 flex items-center justify-center gap-2">
						<span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-xs">🎟️</span>
						Have a coupon code?
					</button>
				</div>
			</div>
		</>
	);
}

export default SummaryCard;
