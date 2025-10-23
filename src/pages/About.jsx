import React, { useEffect } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import { FaUsers, FaShieldAlt, FaAward, FaRocket, FaGlobe, FaClock, FaCheckCircle, FaStar } from "react-icons/fa";

function About() {
	useEffect(() => {
		document.title = "About Us - Compare Airport Parking | Trusted Parking Solutions";
	}, []);

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
								About <span className="text-[#b4e172]">Compare Airport Parking</span>
							</h1>
							<p className="text-lg sm:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
								We're revolutionizing airport parking by making it easier than ever to find, compare, and book the best
								parking options for your travels. Join millions of satisfied customers worldwide.
							</p>
						</div>
					</div>
					{/* Decorative elements */}
					<div className="absolute top-10 left-10 w-20 h-20 bg-[#b4e172] opacity-20 rounded-full animate-pulse"></div>
					<div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b4e172] opacity-10 rounded-full animate-pulse delay-1000"></div>
				</div>

				<div className="container mx-auto px-4 2xl:px-14 py-16 lg:py-24">
					{/* Mission Section */}
					<div className="relative mb-16 lg:mb-20 overflow-hidden">
						<div className="bg-gradient-to-br from-[#1a454e] to-[#1a475b] rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden">
							{/* Background Pattern */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-[#b4e172] opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
							<div className="absolute bottom-0 left-0 w-48 h-48 bg-[#b4e172] opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

							<div className="relative z-10">
								<div className="grid lg:grid-cols-2 gap-12 items-center">
									<div>
										<div className="flex items-center mb-6">
											<div className="w-16 h-16 bg-[#b4e172] rounded-2xl flex items-center justify-center mr-4">
												<FaRocket className="text-2xl text-[#1a475b]" />
											</div>
											<h2 className="text-3xl lg:text-4xl font-bold">Our Mission</h2>
										</div>
										<p className="text-lg text-gray-200 mb-6 leading-relaxed">
											At Compare Airport Parking, our mission is to simplify the airport parking experience for travelers
											worldwide. We believe that finding parking shouldn't add stress to your journey.
										</p>
										<p className="text-lg text-gray-200 leading-relaxed">
											By aggregating parking options from trusted providers and presenting them in an easy-to-compare format, we
											help you make informed decisions quickly and confidently.
										</p>
									</div>
									<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
										<h3 className="text-2xl font-bold mb-6 text-[#b4e172]">What We Stand For</h3>
										<div className="space-y-4">
											<div className="flex items-start space-x-3">
												<div className="w-2 h-2 bg-[#b4e172] rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-gray-200">Transparency in pricing and services</span>
											</div>
											<div className="flex items-start space-x-3">
												<div className="w-2 h-2 bg-[#b4e172] rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-gray-200">Customer-first approach in everything we do</span>
											</div>
											<div className="flex items-start space-x-3">
												<div className="w-2 h-2 bg-[#b4e172] rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-gray-200">Innovation in travel technology</span>
											</div>
											<div className="flex items-start space-x-3">
												<div className="w-2 h-2 bg-[#b4e172] rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-gray-200">Partnership with trusted providers</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Stats Section */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20">
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
							<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
								<FaUsers className="text-2xl text-white" />
							</div>
							<h3 className="text-3xl font-bold text-[#1a454e] mb-2">2M+</h3>
							<p className="text-gray-600 font-semibold">Happy Customers</p>
						</div>
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
							<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
								<FaGlobe className="text-2xl text-white" />
							</div>
							<h3 className="text-3xl font-bold text-[#1a454e] mb-2">50+</h3>
							<p className="text-gray-600 font-semibold">Airports Covered</p>
						</div>
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
							<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
								<FaClock className="text-2xl text-white" />
							</div>
							<h3 className="text-3xl font-bold text-[#1a454e] mb-2">24/7</h3>
							<p className="text-gray-600 font-semibold">Customer Support</p>
						</div>
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
							<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
								<FaStar className="text-2xl text-white" />
							</div>
							<h3 className="text-3xl font-bold text-[#1a454e] mb-2">4.9</h3>
							<p className="text-gray-600 font-semibold">Customer Rating</p>
						</div>
					</div>


					{/* Story Section */}
					<div className="mb-16 lg:mb-20">
						<div className="text-center mb-12">
							<h2 className="text-3xl lg:text-4xl font-bold text-[#1a454e] mb-4">Our Story</h2>
							<div className="w-24 h-1 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] mx-auto mb-6"></div>
							<p className="text-lg text-gray-600 max-w-2xl mx-auto">
								From humble beginnings to industry leadership - discover the journey that shaped our commitment to excellence.
							</p>
						</div>

						<div className="grid lg:grid-cols-2 gap-12 items-start">
							{/* Story Content */}
							<div className="space-y-8">
								<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
									<div className="flex items-center mb-4">
										<div className="w-14 h-12 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-xl flex items-center justify-center mr-4">
											<span className="text-white font-bold text-md">2018</span>
										</div>
										<h3 className="text-xl font-bold text-[#1a454e]">The Beginning</h3>
									</div>
									<p className="text-gray-600 leading-relaxed">
										Founded in 2018, Compare Airport Parking was born from the frustration of travelers dealing with confusing
										parking options and hidden fees. Our founders, experienced in the travel industry, saw an opportunity to
										create a transparent, user-friendly platform.
									</p>
								</div>

								<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
									<div className="flex items-center mb-4">
										<div className="w-14 h-12 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-xl flex items-center justify-center mr-4">
											<span className="text-white font-bold text-md">2024</span>
										</div>
										<h3 className="text-xl font-bold text-[#1a454e]">Today & Beyond</h3>
									</div>
									<p className="text-gray-600 leading-relaxed">
										Today, we serve travelers across major airports in the United States, offering comprehensive parking
										solutions that save time and money. Our commitment to innovation and customer satisfaction drives
										everything we do.
									</p>
								</div>
							</div>

							{/* Benefits Card */}
							<div className="bg-gradient-to-br from-[#1a454e] to-[#1a475b] rounded-2xl p-8 text-white">
								<h3 className="text-2xl font-bold mb-6 text-center">Why Choose Us?</h3>
								<div className="space-y-6">
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Transparent Pricing</h4>
											<p className="text-sm text-gray-200">No hidden fees or surprises</p>
										</div>
									</div>
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Instant Confirmation</h4>
											<p className="text-sm text-gray-200">Book and confirm in seconds</p>
										</div>
									</div>
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">24/7 Support</h4>
											<p className="text-sm text-gray-200">Always here to help you</p>
										</div>
									</div>
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Secure Payments</h4>
											<p className="text-sm text-gray-200">Enterprise-grade security</p>
										</div>
									</div>
									<div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 bg-[#b4e172] rounded-lg flex items-center justify-center flex-shrink-0">
											<FaCheckCircle className="text-[#1a475b] text-lg" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Free Cancellation</h4>
											<p className="text-sm text-gray-200">Flexible booking options</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom Message */}
						<div className="text-center mt-12">
							<div className="bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-2xl p-8 text-[#1a475b]">
								<h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
								<p className="text-lg font-semibold">
									Join millions of satisfied customers and experience the difference with Compare Airport Parking.
								</p>
							</div>
						</div>
					</div>


					{/* Features Section */}
					<div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-20">
						<div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
							<div className="w-20 h-20 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-6">
								<FaUsers className="text-3xl text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#1a454e] mb-4">Trusted by Millions</h3>
							<p className="text-gray-600 leading-relaxed">
								Over 2 million travelers have used our platform to find their perfect parking solution with complete confidence and satisfaction.
							</p>
						</div>
						<div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
							<div className="w-20 h-20 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-6">
								<FaShieldAlt className="text-3xl text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#1a454e] mb-4">Secure & Reliable</h3>
							<p className="text-gray-600 leading-relaxed">
								We partner with verified parking providers and ensure secure transactions for every booking with enterprise-grade security.
							</p>
						</div>
						<div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
							<div className="w-20 h-20 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-6">
								<FaAward className="text-3xl text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#1a454e] mb-4">Award-Winning Service</h3>
							<p className="text-gray-600 leading-relaxed">
								Recognized for excellence in customer service and innovation in travel technology by industry leaders.
							</p>
						</div>
					</div>


					{/* CTA Section */}
					<div className="bg-gradient-to-r from-[#1a454e] to-[#1a475b] rounded-3xl p-8 sm:p-10 lg:p-12 text-white text-center">
						<h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Experience Better Parking?</h2>
						<p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
							Start your journey with us today and discover why millions of travelers trust Compare Airport Parking for their parking needs.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/packages"
								className="bg-[#b4e172] text-[#1a475b] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#9dd65a] transition-colors duration-300 shadow-lg hover:shadow-xl "
							>
								Find Parking Now
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

export default About;