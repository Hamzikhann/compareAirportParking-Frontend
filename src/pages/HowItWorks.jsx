import React, { useEffect } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Steps from "../components/Steps";
import { FaSearch, FaCalendarAlt, FaCreditCard } from "react-icons/fa";

function HowItWorks() {
	useEffect(() => {
		document.title = "How It Works - Compare Airport Parking | Easy Parking Solutions";
	}, []);

	const steps = [
		{
			icon: <FaSearch className="text-4xl text-[#1a454e]" />,
			title: "Search & Compare",
			description:
				"Enter your airport and dates to compare parking options from top providers. Find the best deals instantly."
		},
		{
			icon: <FaCalendarAlt className="text-4xl text-[#1a454e]" />,
			title: "Book Your Spot",
			description: "Select your preferred parking package, choose add-ons, and reserve your spot securely online."
		},
		{
			icon: <FaCreditCard className="text-4xl text-[#1a454e]" />,
			title: "Pay & Park",
			description: "Complete payment and receive confirmation. Arrive at the airport and park with ease."
		}
	];

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-[#1a454e] mb-4">How It Works</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Discover how our airport parking comparison platform makes finding and booking the perfect parking spot
							simple and stress-free.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 mb-16">
						{steps.map((step, index) => (
							<div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
								<div className="flex justify-center mb-4">{step.icon}</div>
								<h3 className="text-xl font-semibold text-[#1a454e] mb-2">{step.title}</h3>
								<p className="text-gray-600">{step.description}</p>
							</div>
						))}
					</div>

					<div className="bg-white p-8 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold text-[#1a454e] mb-6 text-center">Why Choose Us?</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold text-[#1a454e] mb-2">Save Time & Money</h3>
								<p className="text-gray-600">
									Compare multiple parking providers to find the best rates and availability for your travel dates.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-[#1a454e] mb-2">Secure Booking</h3>
								<p className="text-gray-600">
									Book with confidence using our secure payment system and instant confirmation.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-[#1a454e] mb-2">Flexible Options</h3>
								<p className="text-gray-600">
									Choose from short-term, long-term, and valet parking options to suit your needs.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-[#1a454e] mb-2">24/7 Support</h3>
								<p className="text-gray-600">
									Get help anytime with our customer support team available around the clock.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default HowItWorks;
