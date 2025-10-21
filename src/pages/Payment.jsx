import React, { useEffect, useState } from "react";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ApiService from "../services/ApiServices";
import SummaryCard from "../components/SummaryCard";
import useUserStore from "../store/userStore";
import bookingDataStore from "../store/bookingDataStore";
import selectedPackageStore from "../store/selectedPackage";
import useCheckoutStore from "../store/checkoutStore";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Steps from "../components/Steps";
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle, RotateCcw, Calendar, Plane, Car } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePaymentWrapper = ({ selectedPackage, children, setPaymentIntent, user, bookingData }) => {
	const [clientSecret, setClientSecret] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [bookingConflict, setBookingConflict] = useState(false);

	useEffect(() => {
		const fetchClientSecret = async () => {
			try {
				const response = await ApiService.postRequest({
					path: "stripe/create-payment-intent",
					payload: {
						startDate: bookingData?.startDate,
						endDate: bookingData?.endDate,
						startTime: bookingData?.startTime,
						endTime: bookingData?.endTime,
						airport: bookingData?.airport,
						userId: user?.user?.id,
						amount: selectedPackage?.price,
						currency: "gbp",
						payment_method_types: ["card"],
						customer: {
							email: user?.user?.email,
							name: `${user?.user?.firstName} ${user?.user?.lastName}`
						}
					}
				});

				if (response?.data) {
					setPaymentIntent(response.data.paymentIntent.id);
					setClientSecret(response.data.clientSecret);
				}
			} catch (err) {
				if (err.response?.status === 409) {
					setBookingConflict(true);
					setError("This booking slot is already registered. Please choose different dates/times.");
				} else {
					setError(err.message || "Failed to initialize payment");
				}
			} finally {
				setLoading(false);
			}
		};

		if (selectedPackage) fetchClientSecret();
	}, [selectedPackage]);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
				<div className="animate-spin rounded-full h-12 w-12 border-3 border-[#b4e172] border-t-transparent mb-4"></div>
				<p className="text-gray-600 font-medium">Initializing secure payment...</p>
				<p className="text-sm text-gray-500 mt-2">Please wait while we set up your payment</p>
			</div>
		);
	}

	if (bookingConflict) {
		return (
			<div className="bg-white rounded-2xl border border-orange-200 shadow-sm overflow-hidden">
				<div className="bg-orange-50 px-6 py-4 border-b border-orange-100">
					<div className="flex items-center gap-3">
						<AlertCircle className="text-orange-500" size={24} />
						<h3 className="text-lg font-semibold text-orange-800">Booking Conflict</h3>
					</div>
				</div>
				<div className="p-6">
					<div className="flex items-start gap-4 mb-6">
						<div className="flex-shrink-0">
							<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
								<Calendar className="text-orange-500" size={20} />
							</div>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 mb-2">Time Slot Unavailable</h4>
							<p className="text-gray-600 mb-4">
								The selected booking period conflicts with an existing reservation. Please choose different dates or
								times for your parking.
							</p>
							<div className="bg-gray-50 rounded-lg p-4 mb-4">
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="font-medium text-gray-700">Start:</span>
										<p className="text-gray-600">
											{bookingData?.startDate} at {bookingData?.startTime}
										</p>
									</div>
									<div>
										<span className="font-medium text-gray-700">End:</span>
										<p className="text-gray-600">
											{bookingData?.endDate} at {bookingData?.endTime}
										</p>
									</div>
									<div className="col-span-2">
										<span className="font-medium text-gray-700">Airport:</span>
										<p className="text-gray-600">{bookingData?.airport}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex gap-3">
						<button
							onClick={() => window.history.back()}
							className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
						>
							<RotateCcw size={18} />
							Modify Booking
						</button>
						<button
							onClick={() => window.location.reload()}
							className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (error && !bookingConflict) {
		return (
			<div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
				<div className="bg-red-50 px-6 py-4 border-b border-red-100">
					<div className="flex items-center gap-3">
						<AlertCircle className="text-red-500" size={24} />
						<h3 className="text-lg font-semibold text-red-800">Payment Error</h3>
					</div>
				</div>
				<div className="p-6">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
					>
						<RotateCcw size={18} />
						Retry Payment
					</button>
				</div>
			</div>
		);
	}

	if (!clientSecret) {
		return (
			<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
				<AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
				<p className="text-gray-600 mb-2">Payment initialization failed</p>
				<p className="text-sm text-gray-500 mb-4">Please try refreshing the page or contact support</p>
				<button
					onClick={() => window.location.reload()}
					className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
				>
					Refresh Page
				</button>
			</div>
		);
	}

	return (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret,
				appearance: {
					theme: "stripe",
					variables: {
						colorPrimary: "#3b82f6",
						colorBackground: "#ffffff",
						colorText: "#1f2937",
						colorDanger: "#ef4444",
						fontFamily: "Inter, system-ui, sans-serif",
						spacingUnit: "4px",
						borderRadius: "8px"
					},
					rules: {
						".Input": {
							border: "1px solid #d1d5db",
							padding: "12px",
							fontSize: "16px"
						}
					}
				}
			}}
		>
			{children}
		</Elements>
	);
};

const StripePaymentForm = ({ selectedPackage, onSuccess, user }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [paymentElementLoaded, setPaymentElementLoaded] = useState(false);

	if (!stripe || !elements) {
		return (
			<div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
				<div className="animate-spin rounded-full h-8 w-8 border-2 border-[#b4e172] border-t-transparent mb-3"></div>
				<p className="text-gray-600 text-sm">Loading payment form...</p>
			</div>
		);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements || !paymentElementLoaded) {
			setErrorMessage("Payment form is not ready");
			return;
		}

		setLoading(true);
		setErrorMessage(null);

		try {
			const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					receipt_email: user?.user?.email,
					return_url: window.location.origin + "/confirmation"
				},
				redirect: "if_required"
			});

			if (stripeError) {
				setErrorMessage(stripeError.message);
				return;
			}

			if (paymentIntent) {
				switch (paymentIntent.status) {
					case "succeeded":
						await onSuccess();
						break;
					case "processing":
						setErrorMessage("Payment processing — please wait.");
						break;
					case "requires_payment_method":
						setErrorMessage("Payment failed. Please try again.");
						break;
					default:
						setErrorMessage("Something went wrong with your payment.");
				}
			}
		} catch (err) {
			setErrorMessage(err.message || "Payment failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-[#b4e172] to-[#1a475b] px-6 py-4">
				<div className="flex items-center gap-3">
					<CreditCard className="text-white" size={24} />
					<h3 className="text-lg font-semibold text-white">Secure Payment</h3>
				</div>
			</div>

			{/* Payment Form */}
			<div className="p-6">
				{/* Amount Display */}
				<div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
					<p className="text-sm text-blue-700 font-medium mb-1">Total Amount Due</p>
					<p className="text-2xl font-bold text-blue-900">GBP {selectedPackage?.price || "0.00"}</p>
				</div>

				{/* Payment Element */}
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<PaymentElement
							onReady={() => setPaymentElementLoaded(true)}
							options={{
								wallets: { applePay: "never", googlePay: "never" },
								layout: { type: "tabs", defaultCollapsed: false }
							}}
						/>
					</div>

					{/* Error Message */}
					{errorMessage && (
						<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
							<AlertCircle className="text-red-500 flex-shrink-0" size={18} />
							<p className="text-red-700 text-sm">{errorMessage}</p>
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={!stripe || !paymentElementLoaded || loading}
						className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-green-500/25"
					>
						{loading ? (
							<>
								<div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
								<span>Processing Payment...</span>
							</>
						) : (
							<>
								<Lock size={18} />
								<span>Pay GBP {selectedPackage?.price || "0.00"}</span>
							</>
						)}
					</button>
				</form>

				{/* Security Badges */}
				<div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
					<div className="flex items-center gap-2 text-gray-500">
						<Shield size={16} />
						<span className="text-xs font-medium">SSL Encrypted</span>
					</div>
					<div className="flex items-center gap-2 text-gray-500">
						<CheckCircle size={16} />
						<span className="text-xs font-medium">PCI Compliant</span>
					</div>
				</div>
			</div>
		</div>
	);
};

function Payment() {
	const { user } = useUserStore();
	const { bookingData, clearBookingData } = bookingDataStore();
	const { checkoutData } = useCheckoutStore();
	const { selectedPackage, clearPackages } = selectedPackageStore();

	const [paymentIntent, setPaymentIntent] = useState();

	const handlePaymentSuccess = async () => {
		const data = {
			path: "booking/create",
			payload: {
				// Booking Details
				startDate: bookingData?.startDate,
				startTime: bookingData?.startTime,
				endDate: bookingData?.endDate,
				endTime: bookingData?.endTime,
				airport: bookingData?.airport,

				// Checkout Details
				outboundTerminal: checkoutData?.outboundTerminal,
				inboundTerminal: checkoutData?.inboundTerminal,
				outboundFlightNo: checkoutData?.departureFlight,
				inboundFlightNo: checkoutData?.returnFlight,
				title: checkoutData?.title,
				firstName: checkoutData?.firstName,
				lastName: checkoutData?.lastName,
				email: checkoutData?.email,
				phoneNo: checkoutData?.phone,
				vehicleRegistrationNo: checkoutData?.vehicleRegNo,
				vehicleManufacturer: checkoutData?.carManufacturer,
				vehicleModel: checkoutData?.carYear,
				vehicleColor: checkoutData?.carColor,
				type: checkoutData?.carType,
				numberOfPassengers: checkoutData?.passengers,

				// User Info
				userId: user?.user?.id,

				// Package Info
				name: selectedPackage?.customTitle || selectedPackage?.name,
				price: selectedPackage?.price,
				description: selectedPackage?.description,
				bulletPoints: selectedPackage?.features || selectedPackage?.bulletPoints,
				totalPayment: selectedPackage?.price,
				referenceNo: `STRIPE-${paymentIntent || "null"}`
			}
		};

		try {
			const response = await ApiService.postRequest(data);
			if (response.data.data) {
				sessionStorage.setItem("booking-info", JSON.stringify(response.data.data));
			}

			clearBookingData();
			clearPackages();
		} catch (err) {
			console.error("Booking creation failed:", err);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#1a475b]/10">
			<Navbar />

			{/* Enhanced Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 font-serif">Secure Payment</h1>
							<p className="text-gray-600 mt-2">Complete your booking with secure payment</p>
						</div>
						<div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
							<Shield size={18} className="text-green-600" />
							<span className="text-sm font-medium text-green-800">100% Secure Payment</span>
						</div>
					</div>
				</div>
			</div>

			<Steps />

			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex gap-8">
					{/* Main Payment Content */}
					<div className="flex-1">
						<div className="space-y-6">
							{/* Booking Summary Card */}
							<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
								<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
									<Calendar className="text-blue-500" size={24} />
									Booking Summary
								</h2>
								<div className="grid grid-cols-2 gap-6">
									<div className="space-y-4">
										<div>
											<h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
												<Plane size={16} />
												Flight Details
											</h3>
											<div className="space-y-1 text-sm text-gray-600">
												<p>
													<span className="font-medium">Outbound:</span> {checkoutData?.departureFlight}
												</p>
												<p>
													<span className="font-medium">Inbound:</span> {checkoutData?.returnFlight}
												</p>
											</div>
										</div>
										<div>
											<h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
												<Car size={16} />
												Vehicle Details
											</h3>
											<div className="space-y-1 text-sm text-gray-600">
												<p>
													<span className="font-medium">Registration:</span> {checkoutData?.vehicleRegNo}
												</p>
												<p>
													<span className="font-medium">Type:</span> {checkoutData?.carType}
												</p>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<div>
											<h3 className="font-semibold text-gray-700 mb-2">Parking Period</h3>
											<div className="space-y-1 text-sm text-gray-600">
												<p>
													<span className="font-medium">From:</span> {bookingData?.startDate} at{" "}
													{bookingData?.startTime}
												</p>
												<p>
													<span className="font-medium">To:</span> {bookingData?.endDate} at {bookingData?.endTime}
												</p>
												<p>
													<span className="font-medium">Airport:</span> {bookingData?.airport}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Payment Section */}
							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
								{selectedPackage && (
									<StripePaymentWrapper
										bookingData={bookingData}
										setPaymentIntent={setPaymentIntent}
										selectedPackage={selectedPackage}
										user={user}
									>
										<StripePaymentForm selectedPackage={selectedPackage} onSuccess={handlePaymentSuccess} user={user} />
									</StripePaymentWrapper>
								)}
							</div>
						</div>
					</div>

					{/* Summary Card Sidebar */}
					<div className="w-96 flex-shrink-0">
						<SummaryCard />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Payment;
