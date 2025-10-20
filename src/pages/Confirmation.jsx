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
	Star
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

	const navigateToAccount = () => navigate("/myAccount");

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
				author: "Your Company Name"
			});
			pdf.save(`receipt-${bookingData?.booking.id}.pdf`);
		});
	};

	if (!bookingData) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-[#738f4c] text-white py-6 shadow-md">
				<div className="container mx-auto px-4 flex justify-between items-center">
					<button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
						<ArrowLeft size={20} />
						<span>Back to Home</span>
					</button>
					<h1 className="text-xl font-bold">Booking Confirmation</h1>
					<div className="w-8"></div> {/* Spacer for alignment */}
				</div>
			</header>

			<main className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					{/* Success Card */}
					<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
						<div className="bg-gradient-to-r from-[#b5de7b] to-[#1a4855] p-6 text-white">
							<div className="flex flex-col items-center text-center">
								<div className="bg-white rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
									<Check className="text-indigo-600 w-8 h-8" strokeWidth={3} />
								</div>
								<h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
								<p className="text-indigo-100 max-w-md">
									Thank you for your booking. A confirmation has been sent to{" "}
									{bookingData.customer?.email || "your email"}.
								</p>
							</div>
						</div>

						{/* Enhanced Receipt */}
						<div ref={receiptRef} className="p-8">
							<div className="border-b border-gray-200 pb-6 mb-6">
								<div className="flex justify-between items-start">
									<div>
										<h2 className="text-xl font-bold text-gray-800">Booking Receipt</h2>
										<p className="text-gray-500 text-sm">{format(new Date(), "dd/MM/yyyy 'at' h:mm a")}</p>
									</div>
									<div className="bg-indigo-100 text-[#1a4855] px-3 py-1 rounded-full text-sm font-medium">
										#{bookingData.booking.id}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
								<div>
									<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Booking Details</h3>
									<div className="space-y-4">
										<div>
											<p className="text-gray-500 text-sm">Vehicle</p>
											<p className="font-medium">
												{bookingData.vehicle.vehicleManufacturer} {bookingData.vehicle.vehicleModel} (
												{bookingData.vehicle.vehicleRegistration})
											</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">Dates</p>
											<p className="font-medium">
												{format(new Date(bookingData.booking.startDate), "dd/MM/yyyy")} -{" "}
												{format(new Date(bookingData.booking.endDate), "dd/MM/yyyy")}
											</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">Terminals</p>
											<p className="font-medium">
												{bookingData.registration.outboundTerminal} <span className="text-gray-400">→</span>{" "}
												{bookingData.registration.inboundTerminal}
											</p>
										</div>
									</div>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
										Payment Information
									</h3>
									<div className="space-y-4">
										{/* <div>
											<p className="text-gray-500 text-sm">Payment Method</p>
											<div className="flex items-center gap-2">
												<CreditCard className="text-indigo-600 w-4 h-4" />
												<p className="font-medium">
													{bookingData.payment.paymentMethod || "Credit Card"} ending in ••••
													{bookingData.payment.lastFourDigits || "1234"}
												</p>
											</div>
										</div> */}
										<div>
											<p className="text-gray-500 text-sm">Transaction Date</p>
											<p className="font-medium">
												{format(new Date(bookingData.payment.createdAt || new Date()), "dd/MM/yyyy 'at' h:mm a")}
											</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">Amount Paid</p>
											<p className="text-2xl font-bold text-[#1a4855]">&pound;{bookingData.payment.totalPayment}</p>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-indigo-50 rounded-lg p-4">
								<div className="flex items-start gap-3">
									<div className="bg-indigo-100 p-2 rounded-full">
										<FileText className="text-[#536a33] w-5 h-5" />
									</div>
									<div>
										<h4 className="font-medium text-gray-800 mb-1">Need help with your booking?</h4>
										<p className="text-sm text-gray-600">
											Contact our support team at support@yourcompany.com or call +1 (555) 123-4567
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={navigateToAccount}
							className="bg-[#b5de7b] hover:bg-[#96c258] text-[#244c30] py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
						>
							View Booking in Account
						</button>
						<button
							onClick={downloadPDF}
							className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
						>
							<Download className="w-5 h-5" />
							Download Receipt
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Confirmation;
