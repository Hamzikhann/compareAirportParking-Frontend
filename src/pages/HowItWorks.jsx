import React, { useEffect } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import {
	FaSearch,
	FaCalendarAlt,
	FaCreditCard,
	FaShieldAlt,
	FaClock,
	FaDollarSign,
	FaHeadset,
	FaCheckCircle,
	FaArrowRight
} from "react-icons/fa";

function HowItWorks() {
	useEffect(() => {
		document.title = "How It Works - Compare Airport Parking | Easy Parking Solutions";
	}, []);

	const steps = [
		{
			number: "01",
			icon: <FaSearch className="text-3xl text-white" />,
			title: "Search & Compare",
			description:
				"Enter your airport and dates to compare parking options from top providers. Find the best deals instantly with our smart comparison engine."
		},
		{
			number: "02",
			icon: <FaCalendarAlt className="text-3xl text-white" />,
			title: "Book Your Spot",
			description:
				"Select your preferred parking package, choose add-ons, and reserve your spot securely online with instant confirmation."
		},
		{
			number: "03",
			icon: <FaCreditCard className="text-3xl text-white" />,
			title: "Pay & Park",
			description:
				"Complete payment and receive confirmation. Arrive at the airport and park with ease - your spot is guaranteed."
		}
	];

	const features = [
		{
			icon: <FaDollarSign className="text-2xl text-white" />,
			title: "Save Time & Money",
			description: "Compare multiple parking providers to find the best rates and availability for your travel dates."
		},
		{
			icon: <FaShieldAlt className="text-2xl text-white" />,
			title: "Secure Booking",
			description: "Book with confidence using our secure payment system and instant confirmation with SSL encryption."
		},
		{
			icon: <FaClock className="text-2xl text-white" />,
			title: "Flexible Options",
			description: "Choose from short-term, long-term, and valet parking options to suit your specific travel needs."
		},
		{
			icon: <FaHeadset className="text-2xl text-white" />,
			title: "24/7 Support",
			description: "Get help anytime with our dedicated customer support team available around the clock."
		}
	];

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
				{/* Hero Section */}
				<div className="relative overflow-hidden bg-gradient-to-r from-[#1a454e] via-[#1a475b] to-[#1a454e]">
					<div className="absolute inset-0 bg-black opacity-20"></div>
					<div className="relative container mx-auto px-4 py-20 sm:py-24 lg:py-32">
						<div className="text-center text-white">
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
								How It <span className="text-[#b4e172]">Works</span>
							</h1>
							<p className="text-lg sm:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
								Discover how our airport parking comparison platform makes finding and booking the perfect parking spot
								simple, secure, and stress-free in just three easy steps.
							</p>
						</div>
					</div>
					{/* Decorative elements */}
					<div className="absolute top-10 left-10 w-20 h-20 bg-[#b4e172] opacity-20 rounded-full animate-pulse"></div>
					<div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b4e172] opacity-10 rounded-full animate-pulse delay-1000"></div>
				</div>

				<div className="container mx-auto px-4 2xl:px-14 py-16 lg:py-24">
					{/* Steps Section */}
					<div className="relative mb-16 lg:mb-20 overflow-hidden">
						<div className="bg-gradient-to-br from-[#1a454e] to-[#1a475b] rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden">
							{/* Background Pattern */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-[#b4e172] opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
							<div className="absolute bottom-0 left-0 w-48 h-48 bg-[#b4e172] opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

							<div className="relative z-10">
								<div className="text-center mb-12">
									<h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple 3-Step Process</h2>
									<div className="w-24 h-1 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] mx-auto mb-6"></div>
									<p className="text-lg text-gray-200 max-w-2xl mx-auto">
										From search to parking - your journey to stress-free airport parking starts here.
									</p>
								</div>

								<div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
									{steps.map((step, index) => (
										<div key={index} className="relative group">
											{/* Connection Line */}
											{index < steps.length - 1 && (
												<div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[#b4e172] to-transparent transform translate-x-6"></div>
											)}

											<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
												{/* Step Number */}
												<div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center shadow-lg">
													<span className="text-[#1a475b] font-bold text-lg">{step.number}</span>
												</div>

												{/* Icon */}
												<div className="flex justify-center mb-6 mt-4">
													<div className="w-20 h-20 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center shadow-lg">
														{step.icon}
													</div>
												</div>

												{/* Content */}
												<h3 className="text-2xl font-bold text-white mb-4 text-center">{step.title}</h3>
												<p className="text-gray-200 text-center leading-relaxed">{step.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Features Section */}
					<div className="mb-16 lg:mb-20">
						<div className="text-center mb-12">
							<h2 className="text-3xl lg:text-4xl font-bold text-[#1a454e] mb-4">Why Choose Us?</h2>
							<div className="w-24 h-1 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] mx-auto mb-6"></div>
							<p className="text-lg text-gray-600 max-w-2xl mx-auto">
								Experience the difference with our comprehensive parking solutions designed for modern travelers.
							</p>
						</div>

						<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
							{features.map((feature, index) => (
								<div
									key={index}
									className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
								>
									<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
										{feature.icon}
									</div>
									<h3 className="text-lg font-semibold text-[#1a454e] mb-3">{feature.title}</h3>
									<p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
								</div>
							))}
						</div>
					</div>

					{/* Benefits Section */}
					<div className="mb-16 lg:mb-20">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div>
								<h2 className="text-3xl lg:text-4xl font-bold text-[#1a454e] mb-6">Your Journey Starts Here</h2>
								<p className="text-lg text-gray-600 mb-8 leading-relaxed">
									Join thousands of satisfied customers who have discovered the convenience of hassle-free airport
									parking. Our platform connects you with trusted parking providers across major airports nationwide.
								</p>
								<div className="space-y-4">
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<span className="text-gray-700 font-medium">Compare prices from multiple providers</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<span className="text-gray-700 font-medium">Secure online booking with instant confirmation</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<span className="text-gray-700 font-medium">Free cancellation up to 24 hours before</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<span className="text-gray-700 font-medium">24/7 customer support for peace of mind</span>
									</div>
								</div>
							</div>
							<div className="bg-gradient-to-br from-[#1a454e] to-[#1a475b] rounded-2xl p-8 text-white">
								<h3 className="text-2xl font-bold mb-6 text-center">Ready to Get Started?</h3>
								<div className="space-y-6">
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaSearch className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Search & Compare</h4>
											<p className="text-sm text-gray-200">Find the best parking deals</p>
										</div>
									</div>
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCalendarAlt className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Book Instantly</h4>
											<p className="text-sm text-gray-200">Reserve your spot in seconds</p>
										</div>
									</div>
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCreditCard className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Pay Securely</h4>
											<p className="text-sm text-gray-200">Safe and encrypted payments</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* CTA Section */}
					<div className="bg-gradient-to-r from-[#1a454e] to-[#1a475b] rounded-3xl p-8 sm:p-10 lg:p-12 text-white text-center">
						<h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Find Your Perfect Parking Spot?</h2>
						<p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
							Start your journey with us today and discover why thousands of travelers trust Compare Airport Parking for
							their parking needs.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/"
								className="bg-[#b4e172] text-[#1a475b] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#9dd65a] transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
							>
								Start Your Search
								<FaArrowRight className="text-lg" />
							</a>
							<a
								href="/contact"
								className="border-2 border-[#b4e172] text-[#b4e172] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#b4e172] hover:text-[#1a475b] transition-all duration-300"
							>
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default HowItWorks;
