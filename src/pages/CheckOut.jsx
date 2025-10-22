import React, { useState, useEffect } from "react";
import Navbar from "../sections/Navbar";
import Steps from "../components/Steps";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import PaymentBox from "../components/PaymentBox";
import Button from "../components/Button";
import Footer from "../sections/Footer";
import SummaryCard from "../components/SummaryCard";
import Login from "../sections/Login";
import SignUp from "../sections/SignUp";
import useUserStore from "../store/userStore";
import useCheckoutStore from "../store/checkoutStore";
import selectedPackageStore from "../store/selectedPackage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, User, Plane, Car, ShieldCheck, ArrowRight, Lock } from "lucide-react";

function CheckOut() {
	const navigate = useNavigate();
	const setCheckoutData = useCheckoutStore((state) => state.setCheckoutData);
	const selectedPackage = selectedPackageStore((state) => state.selectedPackage);
	const { user, isLoggedIn } = useUserStore();

	const [activeSection, setActiveSection] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);

	// ---------- Form States ----------
	const [formData, setFormData] = useState({
		title: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		outboundTerminal: "",
		inboundTerminal: "",
		departureFlight: "",
		returnFlight: "",
		vehicleRegNo: "",
		carYear: "",
		carColor: "",
		carManufacturer: "",
		carType: "",
		passengers: ""
	});

	// Update form data when user logs in
	useEffect(() => {
		if (isLoggedIn && user?.user) {
			setFormData((prev) => ({
				...prev,
				title: user.user.title || prev.title,
				firstName: user.user.firstName || prev.firstName,
				lastName: user.user.lastName || prev.lastName,
				email: user.user.email || prev.email,
				phone: user.user.phoneNo || prev.phone
			}));
		}
	}, [isLoggedIn, user]);

	// ---------- Dropdown Options ----------
	const title = [
		{ label: "Mr", value: "Mr" },
		{ label: "Ms", value: "Ms" },
		{ label: "Mrs", value: "Mrs" },
		{ label: "Dr", value: "Dr" }
	];

	const carType = [
		{ label: "Manual", value: "Manual" },
		{ label: "Auto", value: "Auto" }
	];

	// ---------- Handle Change ----------
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};

	// ---------- Section Navigation ----------
	const sections = [
		{ id: 0, title: "Your Details", icon: User, completed: false },
		{ id: 1, title: "Flight Details", icon: Plane, completed: false },
		{ id: 2, title: "Vehicle Details", icon: Car, completed: false }
	];

	const nextSection = () => {
		if (validateCurrentSection()) {
			if (activeSection < sections.length - 1) {
				setActiveSection(activeSection + 1);
			}
		}
	};

	const prevSection = () => {
		if (activeSection > 0) {
			setActiveSection(activeSection - 1);
		}
	};

	// ---------- Form Validation ----------
	const validateCurrentSection = () => {
		const sectionFields = {
			0: ["title", "firstName", "email", "phone"],
			1: ["outboundTerminal", "inboundTerminal", "departureFlight", "returnFlight"],
			2: ["vehicleRegNo", "carYear", "carColor", "carManufacturer", "carType", "passengers"]
		};

		const currentFields = sectionFields[activeSection];
		for (const field of currentFields) {
			if (!formData[field]) {
				toast.error(`Please fill the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
				return false;
			}
		}
		return true;
	};

	// ---------- Submit Handler ----------
	const handleSubmit = async () => {
		if (!isLoggedIn) {
			toast.error("Please login or sign up before completing your reservation.");
			return;
		}

		if (!validateCurrentSection()) return;

		setIsSubmitting(true);

		try {
			setCheckoutData(formData);
			toast.success("Form submitted successfully!");

			setTimeout(() => {
				navigate("/payment");
			}, 1200);
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const SectionHeader = ({ section, isActive, onClick }) => {
		const Icon = section.icon;
		return (
			<div
				className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
					isActive
						? "bg-gradient-to-r from-[#b4e172]/20 to-[#1a475b]/20 border-2 border-[#b4e172] shadow-sm"
						: "bg-gray-50 border-2 border-transparent hover:border-gray-200"
				}`}
				onClick={onClick}
			>
				<div
					className={`p-3 rounded-lg transition-colors ${
						isActive ? "bg-[#b4e172] text-[#1a475b]" : "bg-gray-200 text-gray-600"
					}`}
				>
					<Icon size={20} />
				</div>
				<div>
					<h3 className={`font-semibold transition-colors ${isActive ? "text-[#1a475b]" : "text-gray-700"}`}>
						{section.title}
					</h3>
					<p className={`text-sm transition-colors ${isActive ? "text-[#b4e172]" : "text-gray-500"}`}>
						Step {section.id + 1} of {sections.length}
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#1a475b]/10">
			<Navbar />

			{/* Enhanced Steps Component */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Complete Your Booking</h1>
							<p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
								Secure your parking reservation in just a few steps
							</p>
						</div>
						<div className="flex items-center gap-2 bg-green-50 px-3 sm:px-4 py-2 rounded-full">
							<ShieldCheck size={16} className="text-green-600" />
							<span className="text-xs sm:text-sm font-medium text-green-800">Secure & Encrypted</span>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
					{/* Left Sidebar - Section Navigation */}
					<div className="w-full lg:w-80 flex-shrink-0">
						<div className="sticky top-8 space-y-3">
							{sections.map((section) => (
								<SectionHeader
									key={section.id}
									section={section}
									isActive={activeSection === section.id}
									onClick={() => setActiveSection(section.id)}
								/>
							))}

							{/* Progress Summary */}
							<div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm mt-6">
								<div className="flex items-center justify-between mb-4">
									<span className="text-sm font-medium text-gray-700">Total Amount</span>
									<span className="text-xl sm:text-2xl font-bold text-gray-900">{selectedPackage?.price}</span>
								</div>
								<div className="space-y-2 text-sm text-gray-600">
									<div className="flex justify-between">
										<span>Parking Fee</span>
										<span>{selectedPackage?.price}</span>
									</div>
									<div className="flex justify-between">
										<span>Service Fee</span>
										<span>£0.00</span>
									</div>
								</div>
								<div className="border-t border-gray-200 mt-4 pt-4">
									<div className="flex items-center gap-2 text-green-600">
										<Lock size={14} />
										<span className="text-sm font-medium">Payment Secured</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex-1">
						<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
							{/* Section Content */}
							<div className="p-4 sm:p-6 lg:p-8">
								{!isLoggedIn ? (
									<div className="text-center py-12">
										<User size={48} className="mx-auto text-gray-400 mb-4" />
										<h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
										<p className="text-gray-600 mb-6">
											Please login or create an account to continue with your booking
										</p>
										<div className="flex gap-4 justify-center">
											<button
												onClick={() => setLoginOpen(true)}
												className="bg-[#b4e172] text-[#1a475b] px-6 py-3 rounded-lg font-medium hover:bg-[#a3d165] transition-colors"
											>
												Login
											</button>
											<button
												onClick={() => setSignupOpen(true)}
												className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
											>
												Sign Up
											</button>
										</div>
									</div>
								) : (
									<>
										{/* Your Details Section */}
										{activeSection === 0 && (
											<div className="space-y-6 animate-fadeIn">
												<div className="flex items-center gap-3 mb-6">
													<User className="text-blue-500" size={24} />
													<h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
												</div>
												<div className="grid grid-cols-2 gap-6">
													<div className="col-span-2 sm:col-span-1">
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Title <span className="text-red-500">*</span>
														</label>
														<Dropdown
															options={title}
															placeholder="Select Title"
															value={formData.title}
															onChange={(val) => handleChange("title", val)}
															width="w-full"
															rounded="rounded-lg"
															padding="py-3 px-4"
														/>
													</div>
													<div className="col-span-2 sm:col-span-1">
														<label className="block text-sm font-medium text-gray-700 mb-2">
															First Name <span className="text-red-500">*</span>
														</label>
														<Input
															type="text"
															placeholder="Enter first name"
															value={formData.firstName}
															onChange={(e) => handleChange("firstName", e.target.value)}
															rounded="rounded-lg"
															width="w-full"
															padding="py-3 px-4"
														/>
													</div>
													<div className="col-span-2 sm:col-span-1">
														<label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
														<Input
															type="text"
															placeholder="Enter last name"
															value={formData.lastName}
															onChange={(e) => handleChange("lastName", e.target.value)}
															rounded="rounded-lg"
															width="w-full"
															padding="py-3 px-4"
														/>
													</div>
													<div className="col-span-2 sm:col-span-1">
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Email <span className="text-red-500">*</span>
														</label>
														<Input
															type="email"
															placeholder="Enter email"
															value={formData.email}
															onChange={(e) => handleChange("email", e.target.value)}
															rounded="rounded-lg"
															width="w-full"
															padding="py-3 px-4"
														/>
													</div>
													<div className="col-span-2">
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Phone No <span className="text-red-500">*</span>
														</label>
														<Input
															type="tel"
															placeholder="Enter phone number"
															value={formData.phone}
															onChange={(e) => handleChange("phone", e.target.value)}
															rounded="rounded-lg"
															width="w-full"
															padding="py-3 px-4"
														/>
													</div>
												</div>
											</div>
										)}

										{/* Flight Details Section */}
										{activeSection === 1 && (
											<div className="space-y-6 animate-fadeIn">
												<div className="flex items-center gap-3 mb-6">
													<Plane className="text-blue-500" size={24} />
													<h2 className="text-2xl font-bold text-gray-900">Flight Information</h2>
												</div>
												<div className="grid grid-cols-2 gap-6">
													{[
														{ label: "Outbound Terminal", field: "outboundTerminal" },
														{ label: "Inbound Terminal", field: "inboundTerminal" },
														{ label: "Departure Flight", field: "departureFlight" },
														{ label: "Return Flight", field: "returnFlight" }
													].map(({ label, field }) => (
														<div key={field} className="col-span-2 sm:col-span-1">
															<label className="block text-sm font-medium text-gray-700 mb-2">
																{label} <span className="text-red-500">*</span>
															</label>
															<Input
																type="text"
																placeholder={`Enter ${label.toLowerCase()}`}
																value={formData[field]}
																onChange={(e) => handleChange(field, e.target.value)}
																rounded="rounded-lg"
																width="w-full"
																padding="py-3 px-4"
															/>
														</div>
													))}
												</div>
											</div>
										)}

										{/* Vehicle Details Section */}
										{activeSection === 2 && (
											<div className="space-y-6 animate-fadeIn">
												<div className="flex items-center gap-3 mb-6">
													<Car className="text-blue-500" size={24} />
													<h2 className="text-2xl font-bold text-gray-900">Vehicle Information</h2>
												</div>
												<div className="grid grid-cols-2 gap-6">
													{[
														{ label: "Vehicle Registration No", field: "vehicleRegNo" },
														{ label: "Car Year", field: "carYear" },
														{ label: "Car Color", field: "carColor" },
														{ label: "Car Manufacturer", field: "carManufacturer" }
													].map(({ label, field }) => (
														<div key={field} className="col-span-2 sm:col-span-1">
															<label className="block text-sm font-medium text-gray-700 mb-2">
																{label} <span className="text-red-500">*</span>
															</label>
															<Input
																type="text"
																placeholder={`Enter ${label.toLowerCase()}`}
																value={formData[field]}
																onChange={(e) => handleChange(field, e.target.value)}
																rounded="rounded-lg"
																width="w-full"
																padding="py-3 px-4"
															/>
														</div>
													))}
													<div className="col-span-2 sm:col-span-1">
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Car Type <span className="text-red-500">*</span>
														</label>
														<Dropdown
															options={carType}
															placeholder="Select car type"
															value={formData.carType}
															onChange={(val) => handleChange("carType", val)}
															width="w-full"
															rounded="rounded-lg"
															padding="py-3 px-4"
														/>
													</div>
													<div className="col-span-2 sm:col-span-1">
														<label className="block text-sm font-medium text-gray-700 mb-2">
															No of Passengers <span className="text-red-500">*</span>
														</label>
														<Input
															type="number"
															placeholder="Enter number of passengers"
															value={formData.passengers}
															onChange={(e) => handleChange("passengers", e.target.value)}
															rounded="rounded-lg"
															width="w-full"
															padding="py-3 px-4"
														/>
													</div>
												</div>
											</div>
										)}
									</>
								)}
							</div>

							{/* Navigation Footer */}
							{isLoggedIn && (
								<div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
									<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
										<button
											onClick={prevSection}
											disabled={activeSection === 0}
											className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors ${
												activeSection === 0
													? "text-gray-400 cursor-not-allowed"
													: "text-gray-700 hover:bg-white border border-gray-300"
											}`}
										>
											Back
										</button>

										{activeSection < sections.length - 1 ? (
											<button
												onClick={nextSection}
												className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#b4e172] text-[#1a475b] px-6 py-3 rounded-lg font-medium hover:bg-[#a3d165] transition-colors"
											>
												Continue
												<ArrowRight size={16} />
											</button>
										) : (
											<button
												onClick={handleSubmit}
												disabled={isSubmitting}
												className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#b4e172] text-[#1a475b] px-8 py-3 rounded-lg font-medium hover:bg-[#a3d165] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{isSubmitting ? (
													<>
														<div className="animate-spin rounded-full h-4 w-4 border-2 border-[#1a475b] border-t-transparent"></div>
														Processing...
													</>
												) : (
													<>
														Complete Reservation
														<CreditCard size={16} />
													</>
												)}
											</button>
										)}
									</div>

									{/* Security Footer */}
									<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
										<div className="flex items-center gap-2 text-gray-500">
											<ShieldCheck size={16} />
											<span className="text-sm">SSL Encrypted</span>
										</div>
										<div className="flex items-center gap-2 text-gray-500">
											<Lock size={16} />
											<span className="text-sm">Secure Payment</span>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<Footer />

			{/* Login Modal */}
			<Login
				open={loginOpen}
				onClose={() => setLoginOpen(false)}
				onOpenSignup={() => {
					setLoginOpen(false);
					setSignupOpen(true);
				}}
			/>

			{/* SignUp Modal */}
			<SignUp
				open={signupOpen}
				onClose={() => setSignupOpen(false)}
				onOpenLogin={() => {
					setSignupOpen(false);
					setLoginOpen(true);
				}}
			/>

			{/* Add some custom styles for animations */}
			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.3s ease-out;
				}
			`}</style>
		</div>
	);
}

export default CheckOut;
