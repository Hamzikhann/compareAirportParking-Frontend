import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import {
	Check,
	CreditCard,
	Download,
	FileText,
	ArrowLeft,
	Calendar,
	MapPin,
	Car,
	Clock,
	Shield,
	Star,
	Mail,
	Phone,
	User,
	Receipt
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";

// Lazy load components for better performance
const Navbar = lazy(() => import("../sections/Navbar"));
const Footer = lazy(() => import("../sections/Footer"));

function Confirmation() {
	const [bookingData, setBookingData] = useState(null);
	const receiptRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const booking = JSON.parse(sessionStorage.getItem("booking-info"));
		setBookingData(booking);
	}, []);

	const navigateToAccount = () => navigate("/customer");

	const downloadPDF = () => {
		const input = receiptRef.current;
		html2canvas(input, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png", 1.0);
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm"
			});

			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

			pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
			pdf.setProperties({
				title: `Booking Receipt - ${bookingData?.booking.id}`,
				subject: "Parking booking confirmation",
				author: "Park Pilot"
			});
			pdf.save(`receipt-${bookingData?.booking.id}.pdf`);
		});
	};

	if (!bookingData) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
			{/* Header */}
			<header className="bg-gradient-to-r from-[#18454f] to-[#2d6b7c] text-white py-8 shadow-xl">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center mb-6">
						<button
							onClick={() => navigate("/")}
							className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
						>
							<ArrowLeft size={20} />
							<span className="font-medium">Back to Home</span>
						</button>
						<div className="text-center">
							<h1 className="text-3xl font-bold">Booking Confirmed</h1>
							<p className="text-green-100 mt-1">Your parking reservation is ready</p>
						</div>
						<div className="w-32"></div> {/* Spacer for alignment */}
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-12 -mt-6">
				<div className="max-w-6xl mx-auto">
					{/* Success Banner */}
					<div className="bg-gradient-to-r from-[#b5e074] to-[#8bc34a] rounded-2xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-transform duration-300">
						<div className="p-8 text-white">
							<div className="flex flex-col md:flex-row items-center justify-between">
								<div className="flex items-center gap-6 mb-6 md:mb-0">
									<div className="bg-white rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-lg">
										<Check className="text-[#18454f] w-10 h-10" strokeWidth={3} />
									</div>
									<div>
										<h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
										<p className="text-green-100 text-lg">
											Your parking spot is reserved. Confirmation sent to{" "}
											<span className="font-semibold">{bookingData.customer?.email || "your email"}</span>.
										</p>
									</div>
								</div>
								<div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
									<p className="text-sm opacity-90">Booking Reference</p>
									<p className="text-2xl font-bold tracking-wider">#{bookingData.booking.id}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Receipt Card */}
						<div className="lg:col-span-2">
							<div ref={receiptRef} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
								{/* Receipt Header */}
								<div className="bg-gradient-to-r from-[#18454f] to-[#2d6b7c] p-6 text-white">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Receipt className="w-8 h-8" />
											<div>
												<h2 className="text-2xl font-bold">Booking Receipt</h2>
												<p className="text-green-100">{format(new Date(), "EEEE, dd/MM/yyyy 'at' HH:mm")}</p>
											</div>
										</div>
										<div className="bg-white/20 px-4 py-2 rounded-full font-semibold">CONFIRMED</div>
									</div>
								</div>

								{/* Receipt Content */}
								<div className="p-8">
									{/* Booking Details */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
										<div className="space-y-6">
											<div>
												<h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
													<Car className="w-4 h-4" />
													Vehicle Details
												</h3>
												<div className="bg-gray-50 rounded-xl p-4">
													<p className="text-2xl font-bold text-gray-800 mb-1">
														{bookingData.vehicle.vehicleManufacturer} {bookingData.vehicle.vehicleModel}
													</p>
													<p className="text-lg text-gray-600 font-mono bg-white px-3 py-1 rounded-lg inline-block">
														{bookingData.vehicle.vehicleRegistration}
													</p>
												</div>
											</div>

											<div>
												<h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
													<MapPin className="w-4 h-4" />
													Terminal Route
												</h3>
												<div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-gray-200">
													<div className="flex items-center justify-between">
														<div className="text-center">
															<p className="text-sm text-gray-500">Departure</p>
															<p className="font-bold text-gray-800">{bookingData.registration.outboundTerminal}</p>
														</div>
														<div className="text-gray-400 mx-4">
															<ArrowLeft className="w-6 h-6 transform rotate-180" />
														</div>
														<div className="text-center">
															<p className="text-sm text-gray-500">Arrival</p>
															<p className="font-bold text-gray-800">{bookingData.registration.inboundTerminal}</p>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="space-y-6">
											<div>
												<h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
													<Calendar className="w-4 h-4" />
													Parking Period
												</h3>
												<div className="bg-gray-50 rounded-xl p-4">
													<div className="grid grid-cols-2 gap-4">
														<div className="text-center">
															<p className="text-sm text-gray-500">Check-in</p>
															<p className="font-bold text-lg text-gray-800">
																{format(new Date(bookingData.booking.startDate), "dd/MM/yyyy")}
															</p>
														</div>
														<div className="text-center">
															<p className="text-sm text-gray-500">Check-out</p>
															<p className="font-bold text-lg text-gray-800">
																{format(new Date(bookingData.booking.endDate), "dd/MM/yyyy")}
															</p>
														</div>
													</div>
												</div>
											</div>

											<div>
												<h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
													<CreditCard className="w-4 h-4" />
													Payment Summary
												</h3>
												<div className="bg-gradient-to-r from-[#18454f] to-[#2d6b7c] rounded-xl p-4 text-white">
													<div className="flex justify-between items-center mb-2">
														<p className="text-green-100">Total Amount</p>
														<p className="text-3xl font-bold">&pound;{bookingData.payment.totalPayment}</p>
													</div>
													<p className="text-green-100 text-sm">
														Paid on {format(new Date(bookingData.payment.createdAt || new Date()), "dd/MM/yyyy")}
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* Support Card */}
									<div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
										<div className="flex items-start gap-4">
											<div className="bg-green-500 p-3 rounded-full">
												<Shield className="text-white w-6 h-6" />
											</div>
											<div className="flex-1">
												<h4 className="font-bold text-gray-800 text-lg mb-2">Need Assistance?</h4>
												<p className="text-gray-600 mb-4">
													Our support team is available 24/7 to help with your parking needs.
												</p>
												<div className="flex flex-wrap gap-4">
													<div className="flex items-center gap-2">
														<Mail className="w-4 h-4 text-green-600" />
														<span className="text-sm text-gray-700">support@parkpilot.com</span>
													</div>
													<div className="flex items-center gap-2">
														<Phone className="w-4 h-4 text-green-600" />
														<span className="text-sm text-gray-700">+44 (0) 20 7123 4567</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Sidebar - Quick Actions & Info */}
						<div className="space-y-6">
							{/* Quick Actions */}
							<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
								<h3 className="font-bold text-gray-800 text-lg mb-4">Quick Actions</h3>
								<div className="space-y-3">
									<button
										onClick={navigateToAccount}
										className="w-full bg-gradient-to-r from-[#b5e074] to-[#9ed558] hover:from-[#9ed558] hover:to-[#8bc34a] text-[#18454f] py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
									>
										<User className="w-5 h-5" />
										View in My Account
									</button>
									<button
										onClick={downloadPDF}
										className="w-full border-2 border-gray-300 hover:border-[#18454f] hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200"
									>
										<Download className="w-5 h-5" />
										Download Receipt
									</button>
								</div>
							</div>

							{/* Booking Tips */}
							<div className="bg-gradient-to-br from-[#18454f] to-[#2d6b7c] rounded-2xl shadow-xl p-6 text-white">
								<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
									<Star className="w-5 h-5" />
									Parking Tips
								</h3>
								<ul className="space-y-3 text-sm">
									<li className="flex items-start gap-2">
										<div className="bg-green-500 rounded-full p-1 mt-1">
											<Check className="w-3 h-3" />
										</div>
										<span>Arrive 15 minutes before your scheduled check-in time</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-green-500 rounded-full p-1 mt-1">
											<Check className="w-3 h-3" />
										</div>
										<span>Keep your booking reference handy for quick access</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="bg-green-500 rounded-full p-1 mt-1">
											<Check className="w-3 h-3" />
										</div>
										<span>Download your receipt for your records</span>
									</li>
								</ul>
							</div>

							{/* Security Badge */}
							<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 text-center">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="w-8 h-8 text-green-600" />
								</div>
								<h4 className="font-bold text-gray-800 mb-2">Secure Booking</h4>
								<p className="text-sm text-gray-600">
									Your parking reservation is protected with 256-bit SSL encryption
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Confirmation;
