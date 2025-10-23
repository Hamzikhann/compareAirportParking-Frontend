import React, { useEffect, useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Button from "../components/Button";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function ContactUs() {
	useEffect(() => {
		document.title = "Contact Us - Compare Airport Parking | Get in Touch";
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// In a real app, this would send the form data to a backend
		toast.success("Thank you for your message! We'll get back to you soon.");
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

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
								Get in <span className="text-[#b4e172]">Touch</span>
							</h1>
							<p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
								Have questions about airport parking? Need help with your booking?
								Our dedicated support team is here to assist you 24/7.
							</p>
						</div>
					</div>
					{/* Decorative elements */}
					<div className="absolute top-10 left-10 w-20 h-20 bg-[#b4e172] opacity-20 rounded-full animate-pulse"></div>
					<div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b4e172] opacity-10 rounded-full animate-pulse delay-1000"></div>
				</div>

				<div className="container mx-auto px-4 2xl:px-14 py-16 lg:py-24">
					{/* Main Content */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">
						{/* Contact Form */}
						<div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
							<div className="mb-8">
								<h2 className="text-3xl lg:text-4xl font-bold text-[#1a454e] mb-4">Send us a Message</h2>
								<p className="text-gray-600 text-lg">
									Fill out the form below and we'll get back to you as soon as possible.
								</p>
							</div>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label htmlFor="name" className="block text-sm font-semibold text-[#1a454e] mb-2">
											Full Name *
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											placeholder="Enter your full name"
											className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#b4e172]/20 focus:border-[#b4e172] transition-all duration-300"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-semibold text-[#1a454e] mb-2">
											Email Address *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											placeholder="Enter your email"
											className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#b4e172]/20 focus:border-[#b4e172] transition-all duration-300"
										/>
									</div>
								</div>
								<div>
									<label htmlFor="subject" className="block text-sm font-semibold text-[#1a454e] mb-2">
										Subject *
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										required
										placeholder="What's this about?"
										className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#b4e172]/20 focus:border-[#b4e172] transition-all duration-300"
									/>
								</div>
								<div>
									<label htmlFor="message" className="block text-sm font-semibold text-[#1a454e] mb-2">
										Message *
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows="4"
										placeholder="Tell us more about your inquiry..."
										className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#b4e172]/20 focus:border-[#b4e172] transition-all duration-300 resize-none"
									></textarea>
								</div>
								<div className="">
									<Button
										type="submit"
										text="Send Message"
										bg="bg-gradient-to-r from-[#b4e172] to-[#9dd65a]"
										borderColor="border-transparent"
										textColor="text-[#1a475b]"
										className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
									/>
								</div>
							</form>
						</div>

						{/* Contact Information */}
						<div className="space-y-8">
							<div className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-xl">
								<h2 className="text-3xl lg:text-4xl font-bold text-[#1a454e] mb-8">Contact Information</h2>
								<div className="space-y-8">
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-xl flex items-center justify-center flex-shrink-0">
											<FaMapMarkerAlt className="text-xl text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-[#1a454e] mb-2">Our Office</h3>
											<p className="text-gray-600 leading-relaxed text-sm sm:text-base">
												123 Airport Way<br />
												Travel City, TC 12345<br />
												United States
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-2 sm:space-x-4">
										<div className="w-12 h-12 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-xl flex items-center justify-center flex-shrink-0">
											<FaPhone className="text-xl text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-[#1a454e] mb-2">Phone Numbers</h3>
											<p className="text-gray-600 leading-relaxed text-sm sm:text-base">
												(555) 123-PARK<br />
												Toll-free: 1-800-AIRPORT
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-xl flex items-center justify-center flex-shrink-0">
											<FaEnvelope className="text-xl text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-[#1a454e] mb-2">Email Addresses</h3>
											<p className="text-gray-600 leading-relaxed text-sm sm:text-base">
												support@compareairportparking.com<br />
												sales@compareairportparking.com
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-xl flex items-center justify-center flex-shrink-0">
											<FaClock className="text-xl text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-[#1a454e] mb-2">Business Hours</h3>
											<p className="text-gray-600 leading-relaxed text-sm sm:text-base">
												Monday - Friday: 9:00 AM - 6:00 PM EST<br />
												Saturday: 10:00 AM - 4:00 PM EST<br />
												Sunday: Closed
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Contact Card */}
					<div className="bg-gradient-to-r from-[#1a454e] to-[#1a475b] text-center rounded-3xl p-6 sm:p-8 text-white mb-16 lg:mb-20">
						<h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
						<p className="text-gray-200 mb-6">
							For urgent parking issues or last-minute bookings, call our emergency hotline.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<a
								href="tel:+15551234567"
								className="bg-[#b4e172] text-[#1a475b] px-6 py-3 rounded-xl font-semibold text-center hover:bg-[#9dd65a] transition-colors duration-300"
							>
								Call Now
							</a>
							<a
								href="mailto:support@compareairportparking.com"
								className="border-2 border-[#b4e172] text-[#b4e172] px-6 py-3 rounded-xl font-semibold text-center hover:bg-[#b4e172] hover:text-[#1a475b] transition-all duration-300"
							>
								Email Support
							</a>
						</div>
					</div>

					{/* Features Section */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
							<div className="text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
									<FaHeadset className="text-2xl text-white" />
								</div>
								<h3 className="text-xl font-bold text-[#1a454e] mb-2">24/7 Support</h3>
								<p className="text-gray-600">Round-the-clock assistance for all your parking needs</p>
							</div>
						</div>
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
							<div className="text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
									<FaShieldAlt className="text-2xl text-white" />
								</div>
								<h3 className="text-xl font-bold text-[#1a454e] mb-2">Secure & Safe</h3>
								<p className="text-gray-600">Your data and bookings are protected with enterprise-grade security</p>
							</div>
						</div>
						<div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
							<div className="text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-[#b4e172] to-[#9dd65a] rounded-full flex items-center justify-center mx-auto mb-4">
									<FaPaperPlane className="text-2xl text-white" />
								</div>
								<h3 className="text-xl font-bold text-[#1a454e] mb-2">Quick Response</h3>
								<p className="text-gray-600">We respond to all inquiries within 2 hours during business hours</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default ContactUs;
